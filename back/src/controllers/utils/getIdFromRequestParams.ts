import { Request, Response } from "express";

export const getIdFromRequestParams = (req: Request, res: Response): string => {
  const id: string = req.params.id
  if(!id) { res.status(422).json('無効なリクエストです') }
  return id;
}
