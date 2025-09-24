import { randomUUID } from "crypto"
import { Response } from "express";

const COOKIE_NAME = "refresh_token"
const COOKIE_SCOPE = '/api/auth/token_refresh'; // refresh_tokenがリクエストに付加されるpathを限定

export const makeRefreshToken = () => randomUUID();

export const setRefreshTokenInCookie = (res: Response, refreshToken: string) => {
  res.cookie(COOKIE_NAME, refreshToken, {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14days
    secure: process.env.NODE_ENV === 'production',
    path: COOKIE_SCOPE,
    sameSite: "lax",
  });
}

// Cookieを即時失効
export const clearRefreshTokenFromCookie = (res: Response): void => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    path: COOKIE_SCOPE,
    sameSite: "lax",
  });
}
