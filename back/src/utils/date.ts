import dayjs from "dayjs";
import { devLog } from "./dev/devLog";

// tokenの期限が有効かどうか
export const checkExpire = (expiresAt: Date) => {
  const diff = dayjs(expiresAt).diff(dayjs());
  if (diff < 0) {
    devLog('期限切れです');
    return false;
  }

  devLog('有効です：', expiresAt);
  return true
}
