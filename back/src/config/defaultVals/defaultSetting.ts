import { Setting } from "../../types/setting";

export const defaultSetting = (): Setting => ({
  workSec: 1500,
  restSec: 300,
  longRestSec: 900,
  isMuted: false,
  volume: 50,
})

