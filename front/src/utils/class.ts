import dayjs from "dayjs";

// tailwindのクラスを返す
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

// --------------------- 背景によって変化するクラス -----------------------
export const grayTextClass = (simpleBg: boolean) => {
  return simpleBg
  ? "text-white"
  : "text-gray-500"
}

export const btnSmClass = (simpleBg: boolean) => {
  return simpleBg
  ? 'btn btn-sm btn-outline'
  : 'btn btn-sm bg-sky-400 hover:bg-indigo-500 text-black'
}

export const btnMdClass = (simpleBg: boolean) => {
  return simpleBg
  ? 'btn btn-outline'
  : 'btn bg-sky-300 hover:bg-indigo-500 text-gray-700'
}

export const btnLgClass = (simpleBg: boolean) => {
  return simpleBg
  ? 'btn btn-lg btn-outline'
  : 'btn btn-lg bg-sky-400 hover:bg-indigo-500 text-black'
}

export const restBtnClass = (simpleBg: boolean) => {
  return simpleBg
  ? 'btn btn-outline btn-success'
  : 'btn bg-sky-400 hover:bg-indigo-500 text-black'
}


export const bgColorClass = (simpleBg: boolean) => {
  return simpleBg
  ? ''
  : 'bg-gray-100/75'
}

export const containerGrayClass = (simpleBg: boolean) => {
  return simpleBg
  ? 'p-2'
  : 'bg-gray-100/75 rounded-xl p-2'
}


export const textColorClass = (simpleBg: boolean) => {
  return simpleBg
  ? 'text-gray-400 font-semibold'
  : 'text-orange-300 font-extrabold'
}

export const textColorClassOnGrayBg = (simpleBg: boolean) => {
  return simpleBg
  ? ''
  : 'text-gray-700'
}

export const radialProgressBgColorClass = (simpleBg: boolean) => {
  return simpleBg
  ? ''
  : 'bg-sky-100/75'
}
