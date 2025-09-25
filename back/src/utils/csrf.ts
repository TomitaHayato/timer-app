import csrf from "csrf";
import { CsrfInfo } from "../types/csrf";

export const generateCsrfToken = async(): Promise<CsrfInfo> => {
  const csrfInstance = new csrf();
  const secret = await csrfInstance.secret();
  const token = csrfInstance.create(secret);
  return { secret, token }
}
