export type Setting = {
  workSec: number,
  restSec: number,
  longRestSec: number,
  isMuted: boolean,
  volume: number,
  workingSound?: string | null,
  bgImage?: string | null,
}

export type PostSettingParams = {
  workMin: number,
  restMin: number,
  longRestMin: number,
  isMuted: boolean,
  volume: number,
  workingSound?: string,
  bgImage?: string,
}

export type UpdateSettingParams = {
  workMin?: number,
  restMin?: number,
  longRestMin?: number,
  isMuted?: boolean,
  volume?: number,
  workingSound?: string,
  bgImage?: string,
}
