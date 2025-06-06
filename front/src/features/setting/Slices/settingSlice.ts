import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SettingState } from '../types/settingType'
import type { RootState } from '../../../reduxStore/store'

const initialState: SettingState = {
  workSec:  1500,
  restSec:  300,
  longRestSec: 900,
  volume: 50,
  isMuted: false,
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    // ステートを更新
    replaceSetting: (state, action: PayloadAction<SettingState>) => {
      const { workSec, restSec, longRestSec, volume, isMuted } = action.payload;
      if (!workSec || !restSec || !longRestSec || !volume || !isMuted) return;

      state.workSec = workSec
      state.restSec = restSec
      state.longRestSec = longRestSec
      state.volume = volume
      state.isMuted= isMuted
    }
  },
})

export const {
  replaceSetting
} = settingSlice.actions

export const selectSetting = (state: RootState): SettingState => state.setting;
export const settingReducer = settingSlice.reducer;