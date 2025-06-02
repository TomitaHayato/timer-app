import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../../utils/jwt";

// JWTトークンを検証
export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  // リクエストのCookieからJWTを取得
  const token = req.cookies?.jwt_token;
  if (!token) {
    console.log('認証Tokenなし')
    res.status(403).json('認証が必要です');
  }

  try {
    // Token検証
    const payload = verifyJwt(token);
    req.isAuthenticated = true;
    next();
  } catch {
    res.status(403).json('認証が必要です');
  }
}
