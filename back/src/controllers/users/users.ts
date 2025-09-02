import { NextFunction, Request, Response } from "express";
import { getUserIdFromRequest } from "../utils/getUserId";
import { deleteUserById, updateUser } from "../../models/users/users";
import { dbQueryHandler } from "../../models/utils/queryErrorHandler";
import { clearJwtCookie } from "../../utils/jwt";
import { clearRefreshTokenFromCookie } from "../../utils/refreshToken";
import { devLog } from "../../utils/dev/devLog";
import { User, UserUpdateParams } from "../../types/user";
import { getRequestBody } from "../utils/getRequestBody";

export const deleteUser = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserIdFromRequest(req, res);
    // User削除
    await dbQueryHandler(deleteUserById, userId);
    // 認証トークン失効 (DBからの削除はdeleteUserByIdで実行済)
    clearJwtCookie(res);
    clearRefreshTokenFromCookie(res);
    devLog('Userを削除しました');

    res.status(204).json('Userを削除しました');
  } catch(err) { next(err) }
}

export const updateUserProfile = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserIdFromRequest(req, res);
    const params: UserUpdateParams = getRequestBody<User>(req, res);

    const newUser = await dbQueryHandler(updateUser, params, userId);
    devLog('update後のUser:', newUser);
    res.status(200).json(newUser);
  } catch(err) { next(err) }
}
