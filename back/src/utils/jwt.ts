import jwt from 'jsonwebtoken'
import { jwtPayload } from '../types/auth';
import { Response } from 'express';

const SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'flabkdfafkadkvjkavv3d23adkjv'
const COOKIE_NAME: string = 'jwt_token'

export const decodeJwt = (token: string) => {
  const decoded = jwt.decode(token, { json: true });
  return decoded;
}

export const createJwt = (payload: jwtPayload): string => {
  const token: string = jwt.sign(payload, SECRET_KEY, { expiresIn: "10s" });
  return token;
}

export const setJwtInCookie = (res: Response, userId: string): void => {
  const payload: jwtPayload = { userId }
  const token = createJwt(payload);
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14days
    secure: process.env.NODE_ENV === 'production',
  });
}

export const clearJwtCookie = (res: Response): void => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
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
