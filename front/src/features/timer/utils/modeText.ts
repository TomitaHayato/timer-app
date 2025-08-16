import type { TimerMode } from "../../../types/timerType";

export const modeText = (mode: TimerMode) => {
  switch (mode) {
    case 'work':
      return '集中'
    case 'rest':
      return '休憩'
    case 'longRest':
      return '長期休憩'
  }
}
