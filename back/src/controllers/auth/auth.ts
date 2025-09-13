import { NextFunction, Request, Response } from "express"
import { getUserByEmail } from "../../models/users/users";
import { dataHash, hashCompare } from "../../utils/dataHash";
import { dbQueryHandler } from "../../models/utils/queryErrorHandler";
import { clearJwtCookie, decodeJwt, setJwtInCookie, verifyJwt } from "../../utils/jwt";
import { devLog } from "../../utils/dev/devLog";
import { getUserDataSet } from "../../services/auth.service";
import { deleteRefreshToken, getRefreshToken, getRefreshTokenByUserId } from "../../models/authRefreshToken/authRefreshToken";
import { clearRefreshTokenFromCookie, setRefreshTokenInCookie } from "../../utils/refreshToken";
import { TokenExpiredError } from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_ERROR, INVALID_REFRESH_TOKEN, INVALID_TOKEN_ERROR } from "../../utils/errorResponse";
import { getRequestBody } from "../utils/getRequestBody";
import { signinParams } from "../../types/auth";
import { checkExpire } from "../../utils/date";
import { createOrUpdateRefreshToken, refreshRefreshToken } from "../../services/authRefreshToken.service";
import { createNewUserWithRelationRecords } from "../../services/user.service";
import { getUserIdFromJWT } from "../utils/getUserIdFromJwt";

// ユーザー作成 + Settingのデフォルト値作成
export const signUp = async(req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = getRequestBody<{ name: string, email: string, password: string }>(req, res);

  try {
    // 新しいUserと関連レコードをDBに追加
    const newUser = await createNewUserWithRelationRecords({
      name,
      email,
      hashedPassword: await dataHash(password),
    });
    if(!newUser) throw new Error("Userが作成されていません");
    devLog('作成されたUser：', newUser);

    // 作成したリフレッシュトークンを取得
    const authRefreshToken = await dbQueryHandler(getRefreshTokenByUserId, newUser.id);
    if(!authRefreshToken) throw new Error("リフレッシュトークンが作成されていません");

    // リフレッシュトークンとアクセストークンをCookieにセット
    setRefreshTokenInCookie(res, authRefreshToken.token);
    setJwtInCookie(res, newUser.id);

    // DBから作成したユーザーと関連レコードを取得
    const userDataSet = await getUserDataSet(newUser.id);
    res.status(200).json(userDataSet);
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
    if (await hashCompare(password, user.hashedPassword)) {
      const authRefreshToken = await createOrUpdateRefreshToken(user.id);

      // リフレッシュトークンとアクセストークンをCookieにセット
      setRefreshTokenInCookie(res, authRefreshToken.token);
      setJwtInCookie(res, user.id);

      const userDataSet = await getUserDataSet(user.id);
      res.status(200).json(userDataSet);
    } else {
      res.status(401).json('ログインに失敗しました。')
    }
  } catch(err) {
    devLog('ログイン失敗');
    res.status(422).json('ログインに失敗しました')
  }
}

export const signOut = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserIdFromJWT(req, res);

    // Cookieの認証データ削除
    clearJwtCookie(res);
    clearRefreshTokenFromCookie(res);

    // DBの認証データ削除
    await dbQueryHandler(deleteRefreshToken, userId);

    res.status(200).json('ログアウトしました');
  } catch(err) {
    devLog('signoutのエラー:', err);
    next(err);
  }
}

// 認証トークンの有無・有効期限を確認
export const tokenCheck = async (req: Request, res: Response) => {
  // CookieからJWT取得（authCheckミドルウェアを介していないので、req.cookiesから取得し検証する）
  const token = req.cookies?.jwt_token;
  if (!token) {
    devLog('tokenCheckコントローラ：', '認証Tokenなし')
    res.status(401).json(INVALID_TOKEN_ERROR);
    return;
  }

  try {
    // Token検証
    const userId = verifyJwt(token).userId;
    if (!userId) throw new Error;

    const userDataSet = await getUserDataSet(userId);
    res.status(200).json(userDataSet);
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
  // リフレッシュトークンをCookieから検証（存在, 期限）
  devLog('cookieの内容', req.cookies);
  const jwtToken = req.cookies?.jwt_token;
  const refreshToken = req.cookies?.refresh_token;

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

    if(!userId) {
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

    // refreshToken期限切れの場合、DB, Cookieから削除
    if (!checkExpire(refreshTokenInDB.expiresAt)) {
      devLog('tokensRefreshコントローラ', 'tokenが期限切れ');
      clearRefreshTokenFromCookie(res);
      await dbQueryHandler(deleteRefreshToken, userId);
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
