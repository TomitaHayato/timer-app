import { randomUUID } from "crypto"
import { Response } from "express";

const COOKIE_NAME = "refresh_token"

export const makeRefreshToken = () => {
  return randomUUID();
}

export const setRefreshTokenInCookie = (res: Response, refreshToken: string) => {
  res.cookie(COOKIE_NAME, refreshToken, {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14days
    secure: process.env.NODE_ENV === 'production',
  });
}
