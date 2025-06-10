export type TimerState = {
  mode: TimerMode,
  count: number,
  status: boolean,
}

export type TimerMode = 'work' | 'rest' | 'longRest';

export type ModeSecList = {
  workSec: number,
  restSec: number,
  longRestSec: number,
}
