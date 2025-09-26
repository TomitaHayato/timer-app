import Csrf from "csrf";
import { CsrfInfo } from "../../types/csrf";
import { Request, Response } from "express";

const CSRF_TOKEN_HEADER = "X-CSRF-Token";

export const generateCsrfTokenAuto = async(): Promise<CsrfInfo> => {
  const csrfInstance = new Csrf();
  const secret = await csrfInstance.secret();
  const csrfToken = csrfInstance.create(secret);
  return { secret, csrfToken }
}

export const generateCsrfTokenFromSecret = (secret: string): string => {
  const csrfInstance = new Csrf();
  return csrfInstance.create(secret);
}

export const verifyCsrfToken = (params: { token: string, secret: string }): boolean => {
  const { token, secret } = params;
  const csrfInstance = new Csrf();
  return csrfInstance.verify(token, secret);
}

export const setCsrfTokenToReponseHeader = (res: Response, csrfToken: string) => {
  res.setHeader(CSRF_TOKEN_HEADER, csrfToken);
}

export const getCsrfTokenFromReponseHeader = (req: Request): string | undefined => {
  return req.get(CSRF_TOKEN_HEADER);
}
