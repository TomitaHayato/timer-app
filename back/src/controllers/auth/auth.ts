import { NextFunction, Request, Response } from "express"
import { createUserWithSetting, getUserByEmail, getUserWithRelation } from "../../models/users/users";
import { dataHash } from "../../utils/dataHash";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import bcrypt from 'bcrypt'
import { clearJwtCookie, decodeJwt, setJwtInCookie, verifyJwt } from "../../utils/jwt";
import { devLog } from "../../utils/dev/devLog";
import { getUserDataSet } from "../../services/auth.service";
import { getRefreshToken, updateRefreshToken } from "../../models/authRefreshToken/authRefreshToken";
import { checkExpire } from "../../models/authRefreshToken/utils/checkExpire";
import { createRefreshToken, setRefreshTokenInCookie } from "../../utils/refreshToken";
import { TokenExpiredError } from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_ERROR, INVALID_TOKEN_ERROR } from "../../utils/errorResponse";

// ユーザー作成 + Settingのデフォルト値作成
export const signUp = async(req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    // パスワードをハッシュ化
    const hashedPassword = await dataHash(password);
    // DBに保存
    const newUser = await dbQueryHandler(createUserWithSetting, {
      name,
      email,
      hashedPassword,
    })
    devLog('作成されたUser：', newUser);

    if (newUser) {
      setJwtInCookie(res, newUser.id);
      const userDataSet = await getUserDataSet(newUser.id);
      res.status(200).json(userDataSet);
    } else { throw new Error }
  } catch (err) {
    devLog('Signup処理のエラー：', err);
    next(err);
  }
}

export const signIn = async(req: Request, res: Response, next: NextFunction) => {
  // クライアントからの入力値を取得
  const { email, password } = req.body;
  try {
    // DBからemailを持つUserを取得
    const user = await dbQueryHandler(getUserByEmail, email);
    if(!user) {
      res.status(402).json('メールアドレスが登録されていません' );
      return
    }
    // hashedPasswordカラムとpasswordのハッシュを比較
    if (await bcrypt.compare(password, user.hashedPassword)) {
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

export const signOut = (req: Request, res: Response) => {
  clearJwtCookie(res);
  res.status(200).json('ログアウトしました');
}

// 認証トークンの有無・有効期限を確認
export const tokenCheck = async (req: Request, res: Response) => {
  // リクエストのCookieからJWTを取得
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
      devLog('認証トークンの期限切れ');
      res.status(401).json(ACCESS_TOKEN_EXPIRE_ERROR)
      return
    }
    res.status(401).json(INVALID_TOKEN_ERROR);
  }
}

// RefreshTokenによるトークン更新
export const tokensRefresh = async(req: Request, res: Response, next: NextFunction) => {
  // リフレッシュトークンをCookieから検証（存在, 期限）
  const jwtToken = req.cookies?.jwt_token;
  const refreshToken = req.cookies?.refresh_token;
  if (!jwtToken || !refreshToken) return res.status(401).json(INVALID_TOKEN_ERROR);

  // JWTからUserIDを取得
  const decodedJwtToken = decodeJwt(jwtToken);
  const userId = decodedJwtToken?.userId
  if(!userId) return res.status(401).json(INVALID_TOKEN_ERROR);

  // DB: RefreshTokenテーブルから、userIdがこのユーザーと一致するレコードを取得する。ない場合はエラー
  try{
    const refreshTokenInDB = await dbQueryHandler(getRefreshToken, { userId, token: refreshToken });
    if (!refreshTokenInDB) {
      // TODO: refreshTokenがない場合の挙動を確認
      devLog('tokensRefreshコントローラ', 'refreshTokenがDBにない');
      return res.status(401).json(INVALID_TOKEN_ERROR);
    }
    if (checkExpire(refreshTokenInDB)) {
      devLog('tokensRefreshコントローラ', 'tokenが期限切れ')
      return res.status(401).json(INVALID_TOKEN_ERROR);
    }
    // リフレッシュトークン生成 => DB更新 => set-Cookieに付加
    const newRefreshToken = createRefreshToken();
    await dbQueryHandler(updateRefreshToken, { userId, newToken: newRefreshToken })
    setRefreshTokenInCookie(res, newRefreshToken);
    // JWTを再度生=> JWTをSet-cookieに付加
    setJwtInCookie(res, userId);
    devLog('認証トークンを更新しました')
    res.status(200);
  } catch(err) {
    devLog('tokensRefreshコントローラのエラー:', err);
    next(err);
  }
}
