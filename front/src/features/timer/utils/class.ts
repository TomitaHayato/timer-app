import type { TimerMode } from "../types/timerType"

export function modeTextColor(mode: TimerMode) {
  const restTextColor = 'from-amber-600 to-amber-400';
  const workTextColor = 'from-sky-600 to-sky-400';

  const textColorMap: Record<TimerMode, string> = {
    work: workTextColor,
    rest: restTextColor,
    longRest: restTextColor,
  }
  return `bg-gradient-to-tr ${textColorMap[mode]} bg-clip-text text-transparent`
}

export function modeBorderColor(mode: TimerMode) {
  switch (mode) {
    case 'work':
      return 'border-indigo-500'
    default:
      return 'border-yellow-200'
  }
}

export function modeBarColor(mode: TimerMode) {
  switch (mode) {
    case 'work':
      return 'text-primary'
    default:
      return 'text-yellow-600'
  }
}

// 背景に応じたTimerのback ground
export function sceneTimerBgColor(scene: string) {
  switch (scene) {
    case 'wind_bell':
      return 'bg-sky-100/85'
    case 'summer':
      return 'bg-green-200/80'
    case 'Water':
      return 'bg-sky-100/55'
    default:
      return ''
  }
}
