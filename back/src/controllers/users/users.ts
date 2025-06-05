import { NextFunction, Request, Response } from "express";
import { getUserIdFromRequest } from "../utils/getUserId";
import { deleteUserById } from "../../models/users/users";
import { dbQueryHandler } from "../../models/utils/errorHandler";
import { clearJwtCookie } from "../../utils/jwt";

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
