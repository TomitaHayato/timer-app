import type { TimerMode } from "../../../types/timerType"

export function modeTextColor(mode: TimerMode) {
  if(mode === 'work') return "bg-gradient-to-tr from-sky-600 to-sky-400 bg-clip-text text-transparent"

  return "bg-gradient-to-tr from-amber-600 to-amber-400 bg-clip-text text-transparent"
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
