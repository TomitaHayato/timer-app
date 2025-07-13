import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../../utils/jwt";
import { devLog } from "../../utils/dev/devLog";
import { TokenExpiredError } from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_ERROR, INVALID_TOKEN_ERROR } from "../../utils/errorResponse";

// JWTトークンを検証
export const authCheckMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt_token; // リクエストのCookieからJWTを取得
  if (!token) {
    devLog('認証Tokenなし')
    res.status(401).json(INVALID_TOKEN_ERROR);
    return;
  }

  try {
    const payload = verifyJwt(token); // Token検証
    req.decodedJwtPayload = payload;  // デコードしたpaloadをreqに格納
    next();
  } catch(err: unknown) {
    if (err instanceof TokenExpiredError) {
      devLog('認証トークンの期限切れ');
      res.status(401).json(ACCESS_TOKEN_EXPIRE_ERROR)
    }
    res.status(401).json(INVALID_TOKEN_ERROR);
  }
}
