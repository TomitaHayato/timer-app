import type { TimerMode } from "../types/timerType"

export function modeTextColor(mode: TimerMode) {
  switch (mode) {
    case 'work':
      return 'bg-gradient-to-tr from-blue-600 to-indigo-300 bg-clip-text text-transparent'
    default:
      return 'bg-gradient-to-tr from-yellow-600 to-yellow-300 bg-clip-text text-transparent'
  }
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