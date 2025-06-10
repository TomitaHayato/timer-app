import type { Setting } from "./types/settingType";

export const defaultSettingDev: Setting = {
  workSec: 5,
  restSec: 3,
  longRestSec: 900,
  volume: 50,
  isMuted: false,
}

export const defaultSettingProd: Setting = {
  workSec: 1500,
  restSec: 300,
  longRestSec: 900,
  volume: 50,
  isMuted: false,
}

export const defaultSetting = () => {
  if (import.meta.env.DEV) return defaultSettingDev;
  return defaultSettingProd
}
