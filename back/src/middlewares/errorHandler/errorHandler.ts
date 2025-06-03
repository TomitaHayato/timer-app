import { NextFunction, Request, Response } from "express";

export const errorHander = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json('処理が失敗しました');
}
