import type { ModeSecList, TimerMode } from "../types/timerType";

export const getModeSec =(mode: TimerMode, { workSec, restSec, longRestSec }: ModeSecList): number => {
  switch (mode) {
    case 'work': return workSec;
    case 'rest': return restSec;
    case 'longRest': return longRestSec;
    default: return workSec;
  }
}
