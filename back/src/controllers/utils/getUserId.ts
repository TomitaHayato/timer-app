import { Request, Response } from "express";

export const getUserIdFromRequest = (req: Request, res: Response): string => {
  const userId: string = req.decodedJwtPayload?.userId;
  if(!userId) { res.status(422).json('無効なリクエストです') }
  return userId;
}
