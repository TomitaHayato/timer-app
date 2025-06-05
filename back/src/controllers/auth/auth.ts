import { NextFunction, Request, Response } from "express"
import { createUser, getUserByEmail } from "../../models/users/users";
import { dataHash } from "../../utils/dataHash";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import bcrypt from 'bcrypt'
import { clearJwtCookie, setJwtInCookie, verifyJwt } from "../../utils/jwt";
import { devLog } from "../../utils/dev/devLog";

export const signUp = async(req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    // パスワードをハッシュ化
    const hashedPassword = await dataHash(password);
    // DBに保存
    const newUser = await dbQueryHandler(createUser, {
      name,
      email,
      hashedPassword,
    })
    devLog('作成されたUser：', newUser);

    if(newUser) setJwtInCookie(res, newUser.id);
    res.json({ name: newUser?.name });
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
      res.status(200).json('認証成功');
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

export const tokenCheck = async (req: Request, res: Response) => {
  // リクエストのCookieからJWTを取得
  const token = req.cookies?.jwt_token;
  if (!token) {
    devLog('認証Tokenなし')
    res.status(403).json('認証トークンが無効です');
    return;
  }

  try {
    // Token検証
    const payload = verifyJwt(token);
    res.status(200).json(`認証済みのUserです: ${payload.userId}`)
  } catch {
    res.status(403).json('認証失敗');
  }
}
