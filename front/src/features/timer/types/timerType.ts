export type TimerState = {
  mode: TimerMode,
  workSec:  number,
  restSec:  number,
  longRest: number,
  count: number,
}

export type TimerStatePayload = {
  workSec?:  number,
  restSec?:  number,
  longRest?: number,
}

export type TimerMode = 'work' | 'rest' | 'longRest';
