import { NextFunction, Request, Response } from "express"
import { createUser, getUserByEmail } from "../../models/users";
import { dataHash } from "../../utils/dataHash";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import bcrypt from 'bcrypt'

export const signUp = async(req: Request, res: Response) => {
  // クライアントからの入力値を取得
  const { name, email, password } = req.body;
  try {
    // パスワードをハッシュ化したオブジェクトを作成
    const hashedPassword = await dataHash(password);
    // console.log('ハッシュ化したPassword：', hashedPassword);
    // DBに保存
    const newUser = await dbQueryHandler(createUser,
      {
        name,
        email,
        hashedPassword,
      }
    )
    console.log('作成されたUser：', newUser);
    res.json({ name: newUser?.name });
  } catch (err) {
    console.error('Signup処理のエラー：', err);
    res.status(500).json('新規登録処理に失敗しました')
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
      res.status(200).json('認証成功！！')
      // TODO: 認証成功後の処理を追加 or 他のMiddleWareに遷移
    } else {
      res.status(401).json('ログインに失敗しました。')
    }
    return;
  } catch(err) {
    console.log('ログイン失敗');
    res.status(422).json('ログインに失敗しました')
  }
}

export const signOut = async(req: Request, res: Response) => {
}
