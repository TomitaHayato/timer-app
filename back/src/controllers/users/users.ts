import { Request, Response } from "express";
import { defaultAuth } from "../../config/defaultVals/defaultUser"
import { defaultSetting } from "../../config/defaultVals/defaultSetting";
import { defaultTodos } from "../../config/defaultVals/defaultTodos";
import { defaultRecords } from "../../config/defaultVals/defaultRecords";

// 未ログイン時にデフォルトのユーザー情報を返す。
export const getDefault = (req: Request, res: Response) => {
  if(req.isAuthenticated) {
    // ここに、認証済みの場合の処理を追加
    return
  }

  const authInfo = defaultAuth;
  const setting = defaultSetting;
  const todos = defaultTodos;
  const records = defaultRecords;
  res.json({ authInfo, setting, todos, records });
}
