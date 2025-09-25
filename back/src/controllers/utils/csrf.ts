import Csrf from "csrf";
import { CsrfInfo } from "../../types/csrf";
import { Response } from "express";

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
  res.setHeader("X-CSRF-Token", csrfToken);
}
