export type Setting= {
  workSec:  number,
  restSec:  number,
  longRestSec: number,
  volume: number,
  isMuted: boolean,
}

export type SettingState = {
  setting: Setting,
  loading: boolean,
  error: string | null,
} 

export type SettingParams = {
  workSec:  number,
  restSec:  number,
  longRestSec: number,
  volume: number,
  isMuted: boolean,
}

export type settingItems = 'workSec' | 'restSec' | 'longRestSec' | 'volume'
