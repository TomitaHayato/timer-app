export type Setting = {
  workMin: number,
  restMin: number,
  longRestMin: number,
  isMuted: boolean,
  volume: number,
}

export type PostSettingParams = {
  workMin: number,
  restMin: number,
  longRestMin: number,
  isMuted: boolean,
  volume: number,
}

export type UpdateSettingParams = {
  workMin?: number,
  restMin?: number,
  longRestMin?: number,
  isMuted?: boolean,
  volume?: number,
}
