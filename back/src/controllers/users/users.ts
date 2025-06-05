import { NextFunction, Request, Response } from "express";
import { defaultAuth } from "../../config/defaultVals/defaultUser"
import { defaultSetting } from "../../config/defaultVals/defaultSetting";
import { defaultTodos } from "../../config/defaultVals/defaultTodos";
import { defaultRecords } from "../../config/defaultVals/defaultRecords";
import { getUserIdFromRequest } from "../utils/getUserId";
import { deleteUserById } from "../../models/users/users";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import { clearJwtCookie } from "../../utils/jwt";

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

export const deleteUser = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = await getUserIdFromRequest(req, res);
    // User削除
    await dbQueryHandler(deleteUserById, userId);
    // JWT失効
    clearJwtCookie(res);
    res.status(204).json('Userを削除しました');
  } catch(err) { next(err) }
}
