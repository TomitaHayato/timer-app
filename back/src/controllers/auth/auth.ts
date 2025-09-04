import { NextFunction, Request, Response } from "express"
import { getUserByEmail } from "../../models/users/users";
import { dataHash, hashCompare } from "../../utils/dataHash";
import { dbQueryHandler } from "../../models/utils/queryErrorHandler";
import { clearJwtCookie, decodeJwt, setJwtInCookie, verifyJwt } from "../../utils/jwt";
import { devLog } from "../../utils/dev/devLog";
import { getUserDataSet } from "../../services/auth.service";
import { deleteRefreshToken, getRefreshToken, getRefreshTokenByUserId, updateRefreshToken } from "../../models/authRefreshToken/authRefreshToken";
import { clearRefreshTokenFromCookie, makeRefreshToken, setRefreshTokenInCookie } from "../../utils/refreshToken";
import { TokenExpiredError } from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_ERROR, INVALID_REFRESH_TOKEN, INVALID_TOKEN_ERROR } from "../../utils/errorResponse";
import { getRequestBody } from "../utils/getRequestBody";
import { signinParams } from "../../types/auth";
import { checkExpire } from "../../utils/date";
import { createOrUpdateRefreshToken, refreshRefreshToken } from "../../services/authRefreshToken.service";
import { createUserWithRelationRecords } from "../../services/user.service";

// ユーザー作成 + Settingのデフォルト値作成
export const signUp = async(req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    // パスワードをハッシュ化
    const hashedPassword = await dataHash(password);
    // 新しいユーザーと関連レコードをDBに追加
    const newUser = await createUserWithRelationRecords({
      name,
      email,
      hashedPassword,
    });
    devLog('作成されたUser：', newUser);
    if(!newUser) throw new Error();
    // 作成したリフレッシュトークンを取得
    const authRefreshToken = await dbQueryHandler(getRefreshTokenByUserId, newUser.id);
    if(!authRefreshToken) throw new Error();

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
  const { email, password } = getRequestBody<signinParams>(req, res); // クライアントからの入力値を取得

  try {
    const user = await dbQueryHandler(getUserByEmail, email);
    if(!user) {
      res.status(401).json('メールアドレスが登録されていません' );
      return
    }

    // hashedPasswordカラムとpasswordのハッシュを比較
    if (await hashCompare(password, user.hashedPassword)) {
      // refreshTokenを生成
      const authRefreshToken = await createOrUpdateRefreshToken(user.id);
      // リフレッシュトークンとアクセストークンをCookieにセット
      setRefreshTokenInCookie(res, authRefreshToken.token);
      setJwtInCookie(res, user.id);
      const userDataSet = await getUserDataSet(user.id);
      res.status(200).json(userDataSet);
    } else {
      res.status(401).json('ログインに失敗しました。')
    }
    return;
  } catch(err) {
    devLog('ログイン失敗');
    res.status(422).json('ログインに失敗しました')
  }
}

export const signOut = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt_token;
  if (!token) {
    devLog('tokenCheckコントローラ：', '認証Tokenなし')
    res.status(401).json(INVALID_TOKEN_ERROR);
    return;
  }

  try {
    // Token検証
    const payload = verifyJwt(token);
    // 認証成功なので、userに紐づいたTodos, Records, Settingを返す
    const userId = payload.userId;
    if (!userId) throw new Error;

    clearJwtCookie(res);
    clearRefreshTokenFromCookie(res);
    await dbQueryHandler(deleteRefreshToken, userId);

    res.status(200).json('ログアウトしました');
  } catch(err) {
    devLog('signoutのエラー:', err);
    next(err);
  }
}

// 認証トークンの有無・有効期限を確認
export const tokenCheck = async (req: Request, res: Response) => {
  // リクエストのCookieからJWTを取得（authCheckミドルウェアを介していないので、req.cookiesから取得し検証する）
  const token = req.cookies?.jwt_token;
  if (!token) {
    devLog('tokenCheckコントローラ：', '認証Tokenなし')
    res.status(401).json(INVALID_TOKEN_ERROR);
    return;
  }

  try {
    // Token検証
    const payload = verifyJwt(token);
    // 認証成功なので、userに紐づいたTodos, Records, Settingを返す
    const userId = payload.userId;
    if (!userId) throw new Error;

    const userDataSet = await getUserDataSet(userId);
    res.status(200).json(userDataSet);
  } catch(err: unknown) {
    // 期限切れエラーの場合、特徴的なレスポンスを返す
    if (err instanceof TokenExpiredError) {
      devLog('認証トークンの期限切れ', ACCESS_TOKEN_EXPIRE_ERROR);
      res.status(401).json(ACCESS_TOKEN_EXPIRE_ERROR)
      return
    }
    res.status(401).json(INVALID_TOKEN_ERROR);
  }
}

// RefreshTokenによるトークン更新
export const tokensRefresh = async(req: Request, res: Response, next: NextFunction) => {
  // リフレッシュトークンをCookieから検証（存在, 期限）
  devLog('cookieの内容', req.cookies)
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
    const userId = decodedJwtToken?.userId
    if(!userId) {
      devLog('tokensRefreshエラー：', 'userIdがない')
      res.status(401).json(INVALID_TOKEN_ERROR);
      return
    }
    // DBからリフレッシュトークンの状態を取得
    const refreshTokenInDB = await dbQueryHandler(getRefreshToken, { userId, token: refreshToken});
    if (!refreshTokenInDB) {
      devLog('tokensRefreshコントローラ', 'refreshTokenがDBにない');
      res.status(401).json(INVALID_REFRESH_TOKEN);
      return
    }
    // refreshToken期限切れの場合、DB, Cookieから削除
    if (!checkExpire(refreshTokenInDB.expiresAt)) {
      devLog('tokensRefreshコントローラ', 'tokenが期限切れ');
      clearRefreshTokenFromCookie(res);
      await dbQueryHandler(deleteRefreshToken, userId);
      res.status(401).json(INVALID_REFRESH_TOKEN);
      return
    }
    // リフレッシュトークン生成 => DB更新 => set-Cookieに付加
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
