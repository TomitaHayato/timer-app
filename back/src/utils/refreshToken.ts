import { randomUUID } from "crypto"
import dayjs from "dayjs";
import { Response } from "express";
import { authRefreshToken } from "../types/authRefreshToken";
import { devLog } from "./dev/devLog";

const COOKIE_NAME = "refresh_token"
const COOKIE_SCOPE = '/api/auth/token_refresh';

export const makeRefreshToken = () => {
  return randomUUID();
}

export const setRefreshTokenInCookie = (res: Response, refreshToken: string) => {
  res.cookie(COOKIE_NAME, refreshToken, {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14days
    secure: process.env.NODE_ENV === 'production',
    path: COOKIE_SCOPE,
  });
}

export const clearRefreshTokenFromCookie = (res: Response): void => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    path: COOKIE_SCOPE,
  });
}

// tokenの期限が有効かどうか
export const checkExpire = (authRefreshToken: authRefreshToken) => {
  const diff = dayjs(authRefreshToken.expiresAt).diff(dayjs());
  if (diff < 0) return false;

  devLog('リフレッシュトークンは有効：', authRefreshToken.expiresAt)
  return true; // あとでtrueに直す
}