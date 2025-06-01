import { Request, Response } from "express"
import { createUser } from "../../models/users";
import { dataHash } from "../../utils/dataHash";
import { dbQueryHandler } from "../../models/utils/errorHandler";

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
    res.status(500).json({ message: '新規登録処理に失敗しました。' })
  }
}

export const signIn = async(req: Request, res: Response) => {
  // クライアントからの入力値を取得
}

export const signOut = async(req: Request, res: Response) => {
}
