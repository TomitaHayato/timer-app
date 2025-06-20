import dayjs from "dayjs";
import { authRefreshToken } from "../../../types/authRefreshToken";

// tokenの期限が有効かどうか
export const checkExpire = (authRefreshToken: authRefreshToken) => {
  const diff = dayjs(authRefreshToken.expiresAt).diff(dayjs());
  if (diff < 0) return false;
  return true;
}
