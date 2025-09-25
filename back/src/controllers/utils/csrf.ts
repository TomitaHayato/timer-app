import csrf from "csrf";
import { CsrfInfo } from "../../types/csrf";
import { Response } from "express";

export const generateCsrfToken = async(): Promise<CsrfInfo> => {
  const csrfInstance = new csrf();
  const secret = await csrfInstance.secret();
  const csrfToken = csrfInstance.create(secret);
  return { secret, csrfToken }
}

export const setCsrfTokenToReponseHeader = (res: Response, csrfToken: string) => {
  res.setHeader("X-CSRF-Token", csrfToken);
}