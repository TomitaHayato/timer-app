import type { ImageKey } from "../utils/staticFiles/imagePathMap"
import type { WorkingSoundKey } from "../utils/staticFiles/soundFiles"

export type Setting= {
  workSec:  number,
  restSec:  number,
  longRestSec: number,
  volume: number,
  isMuted: boolean,
  workingSound?: WorkingSoundKey,
  bgImage?: ImageKey
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
  workingSound?: WorkingSoundKey,
  bgImage?: ImageKey
}

export type settingItems = 'workSec' | 'restSec' | 'longRestSec' | 'volume'
