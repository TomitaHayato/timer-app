import { Request } from "express";

export const getJwtTokenFromCookie = (req: Request): string | null => {
  const token = req.cookies?.jwt_token;
  if(typeof token === "string") return token;
  return null
}

export const getRefreshTokenFromCookie = (req: Request): string | null => {
  const token = req.cookies?.refresh_token;
  if(typeof token === "string") return token;
  return null
}
