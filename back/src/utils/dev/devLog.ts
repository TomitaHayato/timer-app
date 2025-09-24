import { isProduction } from "../handleENV";

export const devLog = (...args: unknown[]): void => {
  if (isProduction()) return;
  console.log(...args);
}
