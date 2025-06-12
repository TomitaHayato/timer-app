export type Setting= {
  workSec:  number,
  restSec:  number,
  longRestSec: number,
  volume: number,
  isMuted: boolean,
  workingSound?: string,
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
  workingSound?: string,
}

export type settingItems = 'workSec' | 'restSec' | 'longRestSec' | 'volume'
