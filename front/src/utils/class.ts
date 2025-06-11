import dayjs from "dayjs";

export function bgCustom() {
  return "bg-linear-to-tr from-black to-slate-500"
}

export function bgSide() {
  return "bg-linear-to-tl from-indigo-800 to-indigo-700"
}

export function rightDrawer(isOpen: boolean) {
  return isOpen
    ? ''
    : 'translate-x-94'
}

// 期限によってクラスを返す（超過、今日、今週、その他）
export function deadlineColor(date: Date): string {
  const diff = dayjs().diff(dayjs(date), 'd');
  if (diff > 0) {
    return 'text-error';
  } else if (diff === 0) {
    return 'text-warning'
  } else {
    return 'text-green-500'
  }
}