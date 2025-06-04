import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../../utils/jwt";
import { devLog } from "../../utils/dev/devLog";

const ERROR_MESSAGE: string = '認証されていないユーザーです'

// JWTトークンを検証
export const authCheckMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt_token; // リクエストのCookieからJWTを取得
  if (!token) {
    devLog('認証Tokenなし')
    res.status(401).json(ERROR_MESSAGE);
    return;
  }

  try {
    // Token検証
    const payload = verifyJwt(token);
    req.decodedJwtPayload = payload;
    next();
  } catch {
    res.status(401).json(ERROR_MESSAGE);
  }
}
