import type { Setting } from "../../types/settingType";

export const defaultSettingDev = (): Setting => {
  return {
    workSec: 10,
    restSec: 5,
    longRestSec: 10,
    volume: 50,
    isMuted: false,
    workingSound: 'default',
    bgImage: 'default',
  }
}

export const defaultSettingProd = (): Setting => {
  return {
    workSec: 1500,
    restSec: 300,
    longRestSec: 900,
    volume: 50,
    isMuted: false,
    workingSound: 'default',
    bgImage: 'default',
  }
}

export const defaultSetting = (): Setting => {
  if (import.meta.env.DEV) return defaultSettingDev();
  return defaultSettingProd()
}
