export function bgCustom() {
  return "bg-linear-to-tr from-black to-slate-500"
}

export function bgSide() {
  return "bg-linear-to-tl from-indigo-800 to-indigo-700"
}

export function rightDrawer(isOpen: boolean) {
  return isOpen
    ? ''
    : 'translate-x-78'
}
