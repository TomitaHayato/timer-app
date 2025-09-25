import { NextFunction, Request, Response } from "express"
import { getUserByEmail } from "../../models/users/users";
import { dataHash, hashCompare } from "../../utils/dataHash";
import { dbQueryHandler } from "../../models/utils/queryErrorHandler";
import { clearJwtCookie, decodeJwt, setJwtInCookie, verifyJwt } from "../../utils/jwt";
import { devLog } from "../../utils/dev/devLog";
import { getUserAndRecords } from "../../services/auth.service";
import { deleteRefreshToken, getRefreshToken } from "../../models/authRefreshToken/authRefreshToken";
import { clearRefreshTokenFromCookie, setRefreshTokenInCookie } from "../../utils/refreshToken";
import { TokenExpiredError } from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_ERROR, INVALID_REFRESH_TOKEN, INVALID_TOKEN_ERROR } from "../../utils/errorResponse";
import { getRequestBody } from "../utils/getRequestBody";
import { signinParams } from "../../types/auth";
import { checkExpire } from "../../utils/date";
import { refreshRefreshToken } from "../../services/authRefreshToken.service";
import { createNewUserWithRelationRecords } from "../../services/user.service";
import { getUserIdFromJWT } from "../utils/getUserIdFromJwt";
import { getJwtTokenFromCookie, getRefreshTokenFromCookie } from "../utils/getTokenFromCookie";
import { createOrUpdateRefreshTokenAndCsrfSecret, deleteRefreshTokenAndCsrfSecret } from "../../services/refreshTokenAndCsrf.service";
import { generateCsrfTokenAuto, setCsrfTokenToReponseHeader } from "../utils/csrf";
import { getCsrfTokenAndSecret } from "../../services/csrf.service";

// ユーザー作成 + Settingのデフォルト値作成
export const signUp = async(req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = getRequestBody<{ name: string, email: string, password: string }>(req, res);

  try {
    // 新しいUserと関連レコードをDBに追加
    const { user: newUser, refreshToken, csrfToken } = await createNewUserWithRelationRecords({
      name,
      email,
      hashedPassword: await dataHash(password),
    });
    devLog('作成されたUser：', newUser);

    // リフレッシュトークンとアクセストークンをCookieにセット
    setRefreshTokenInCookie(res, refreshToken);
    setJwtInCookie(res, newUser.id);

    // DBから作成したユーザーと関連レコードを取得
    const userWithRelation = await getUserAndRecords(newUser.id);
    setCsrfTokenToReponseHeader(res, csrfToken);
    res.status(201).json(userWithRelation);
  } catch (err) {
    devLog('Signup処理のエラー：', err);
    next(err);
  }
}

export const signIn = async(req: Request, res: Response, next: NextFunction) => {
  const { email, password } = getRequestBody<signinParams>(req, res);

  try {
    const user = await dbQueryHandler(getUserByEmail, email);
    if(!user) {
      res.status(401).json('メールアドレスが登録されていません' );
      return
    }

    // hashedPasswordカラムとpasswordのハッシュを比較
    if (!(await hashCompare(password, user.hashedPassword))) {
      res.status(401).json('ログインに失敗しました。');
    }

    // csrfトークン生成
    const { secret, csrfToken } = await generateCsrfTokenAuto();

    // csrf-secret, refreshTokenをDBに保存
    const { 
      refreshTokenRecord,
    } = await dbQueryHandler(createOrUpdateRefreshTokenAndCsrfSecret, { userId: user.id, secret });

    // リフレッシュトークンとアクセストークンをCookieにセット
    setRefreshTokenInCookie(res, refreshTokenRecord.token);
    setJwtInCookie(res, user.id);

    const userWithRelation = await getUserAndRecords(user.id);

    // レスポンスヘッダにcsrfTokenをセット
    setCsrfTokenToReponseHeader(res, csrfToken);
    res.status(200).json(userWithRelation);
  } catch(err) {
    devLog('ログイン失敗');
    res.status(422).json('ログインに失敗しました')
  }
}

export const signOut = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserIdFromJWT(req, res);

    // DBの認証データ削除
    await dbQueryHandler(deleteRefreshTokenAndCsrfSecret, userId);

    // Cookieの認証データ削除
    clearJwtCookie(res);
    clearRefreshTokenFromCookie(res);

    res.status(200).json('ログアウトしました');
  } catch(err) {
    devLog('signoutのエラー:', err);
    next(err);
  }
}

// 認証トークンの有無・有効期限を確認
export const tokenCheck = async (req: Request, res: Response) => {
  // CookieからJWT取得（authCheckミドルウェアを介していないので、req.cookiesから取得し検証する）
  const token = getJwtTokenFromCookie(req);
  if (!token) {
    devLog('tokenCheckコントローラ：', '認証Tokenなし')
    res.status(401).json(INVALID_TOKEN_ERROR);
    return;
  }

  try {
    // Token検証
    const userId = verifyJwt(token).userId;
    if (typeof userId !== "string") throw new Error;

    // JSONデータ取得
    const userWithRelation = await getUserAndRecords(userId);

    // csrfをヘッダにセット
    const { secret } = await getCsrfTokenAndSecret(userId);
    setCsrfTokenToReponseHeader(res, secret);
    res.status(200).json(userWithRelation);
  } catch(err: unknown) {
    // 期限切れエラーの場合、特徴的なレスポンスを返す（クライアント側でRefreshTokenの検証に移行するため）
    if (err instanceof TokenExpiredError) {
      devLog('認証トークンの期限切れ', ACCESS_TOKEN_EXPIRE_ERROR);
      res.status(401).json(ACCESS_TOKEN_EXPIRE_ERROR);
      return;
    }

    // その他のエラーは未認証とする
    res.status(401).json(INVALID_TOKEN_ERROR);
  }
}

// RefreshTokenによるトークン更新
export const tokensRefresh = async(req: Request, res: Response, next: NextFunction) => {
  devLog('cookieの内容', req.cookies);
  const jwtToken = getJwtTokenFromCookie(req);
  const refreshToken = getRefreshTokenFromCookie(req);

  if (!jwtToken || !refreshToken) {
    devLog('tokensRefreshエラー：', 'jwtまたはrefreshTokenがない')
    res.status(401).json(INVALID_TOKEN_ERROR);
    return
  }

  // DB: RefreshTokenテーブルから、userIdがこのユーザーと一致するレコードを取得する。ない場合はエラー
  try {
    // JWTからUserIDを取得
    const decodedJwtToken = decodeJwt(jwtToken);
    const userId = decodedJwtToken?.userId;

    if(typeof userId !== "string") {
      devLog('tokensRefreshエラー：', 'JWTにuserIdが存在しない')
      res.status(401).json(INVALID_TOKEN_ERROR);
      return
    }

    // DBからリフレッシュトークンの状態を取得
    const refreshTokenInDB = await dbQueryHandler(getRefreshToken, { userId, token: refreshToken});

    if (!refreshTokenInDB) {
      devLog('tokensRefreshコントローラ', 'refreshTokenがDBにない');
      res.status(401).json(INVALID_REFRESH_TOKEN);
      return;
    }

    // refreshToken期限切れの場合、DB・Cookieから削除 + csrfSecretも削除
    if (!checkExpire(refreshTokenInDB.expiresAt)) {
      devLog('tokensRefreshコントローラ', 'tokenが期限切れ');
      await dbQueryHandler(deleteRefreshTokenAndCsrfSecret, userId);
      clearRefreshTokenFromCookie(res);
      res.status(401).json(INVALID_REFRESH_TOKEN);
      return
    }

    // リフレッシュトークン再生成＋DB更新 => set-Cookieに付加
    const { token } = await refreshRefreshToken(userId);
    setRefreshTokenInCookie(res, token);

    // JWTを再度生=> JWTをSet-cookieに付加
    setJwtInCookie(res, userId);

    devLog('認証トークンを更新しました')
    res.status(200).end();
  } catch(err) {
    devLog('tokensRefreshコントローラのエラー:', err);
    next(err);
  }
}
