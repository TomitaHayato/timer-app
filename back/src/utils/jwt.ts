import jwt from 'jsonwebtoken'
import { jwtPayload } from '../types/auth';
import { Response } from 'express';
import { getEnvValue, isProduction } from './handleENV';

const SECRET_KEY = getEnvValue("JWT_SECRET_KEY");
if (!SECRET_KEY) {
  console.log('変数SECRET_KEYが定義されていません');
  process.exit(1);
}
const COOKIE_NAME = getEnvValue("JWT_TOKEN_COOKIE_KEY");
const ACCESS_TOKEN_EXPIRESIN = Number(getEnvValue("ACCESS_TOKEN_EXPIRESIN")) || (30 * 60);

export const decodeJwt = (token: string) => {
  const decoded = jwt.decode(token, { json: true });
  return decoded;
}

export const createJwt = (payload: jwtPayload): string => {
  // デフォルトの暗号方式はHS256（共通鍵）
  const token: string = jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRESIN });
  return token;
}

export const setJwtInCookie = (res: Response, userId: string): void => {
  const payload: jwtPayload = { userId }
  const token = createJwt(payload);
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 21 * 24 * 60 * 60 * 1000, // 21 days (refreshTokenの有効期限より1週間長い)
    secure: isProduction(),
    sameSite: "lax",
  });
}

export const clearJwtCookie = (res: Response): void => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    expires: new Date(0),
    secure: isProduction(),
    sameSite: "lax",
  });
}

export const verifyJwt = (token: string) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    if (typeof payload === 'string') throw new Error
    return payload //検証成功時は、Payloadを返す
  } catch(err) {
    console.error('JWT検証失敗');
    throw err;
  }
}
