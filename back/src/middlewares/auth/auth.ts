import { NextFunction, Request, Response } from "express";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  console.log(req)
  req.isAuthenticated = false // 認証済みかどうかの判定結果
  next();
}
