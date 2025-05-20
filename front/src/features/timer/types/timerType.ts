export type TimerState = {
  workSec:  number,
  restSec:  number,
  longRest: number,
}

export type TimerStatePayload = {
  workSec?:  number,
  restSec?:  number,
  longRest?: number,
}
