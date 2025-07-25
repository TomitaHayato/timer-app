import dayjs from "dayjs";

// 今日の月日
export function todayDate() {
  return dayjs().format('MM月DD日');
}

export function thisWeekDate() {
  const start = dayjs().startOf('w').format('MM月DD日');
  const end = dayjs().endOf('w').format('MM月DD日'); 
  return `${start} ~ ${end}`
}

export function thisMonthDate() {
  const start = dayjs().startOf('month').format('MM月DD日');
  const end = dayjs().endOf('month').format('MM月DD日'); 
  return `${start} ~ ${end}`
}
