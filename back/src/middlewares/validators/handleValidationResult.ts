import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { devLog } from "../../utils/dev/devLog";

export const handleValidationResult = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }

  devLog('バリデーションOUT：', errors.array());
  res.status(422).json({ errors: errors.array() });
  return;
}
