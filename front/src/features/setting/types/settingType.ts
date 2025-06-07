export type SettingState = {
  workSec:  number,
  restSec:  number,
  longRestSec: number,
  volume: number,
  isMuted: boolean,
}

export type SettingParams = {
  workSec:  number,
  restSec:  number,
  longRestSec: number,
  volume: number,
  isMuted: boolean,
}

export type settingItems = 'workSec' | 'restSec' | 'longRestSec' | 'volume' | 'isMuted'
