import jwt from 'jsonwebtoken'
import { jwtPayload } from '../types/auth';
import { Response } from 'express';

const SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'flabkdfafkadkvjkavv3d23adkjv'

export const createJwt = (payload: jwtPayload): string => {
  const token: string = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  return token;
}

export const setJwtInCookie = (res: Response, userId: string): void => {
  const payload: jwtPayload = { userId }
  const token = createJwt(payload);
  res.cookie('jwt_token', token, {
    httpOnly: true,
    maxAge: 7200000,
    secure: process.env.NODE_ENV === 'production',
  });
}
