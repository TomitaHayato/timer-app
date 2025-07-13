import { Request, Response } from "express";
import { isEmptyObj } from "../../utils/object";

export const getRequestBody = <T extends object>(req: Request, res: Response, key?: string): T => {
  const params: T = key ? req.body[key] : req.body;
  if (isEmptyObj(params)) res.status(422).json('無効なリクエストです');
  return params;
}
