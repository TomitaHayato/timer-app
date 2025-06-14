import dayjs from "dayjs";

export function todayDate() {
  return dayjs().format('MM月DD日');
}