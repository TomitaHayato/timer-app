import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Setting } from '../types/settingType'
import type { RootState } from '../../../reduxStore/store'

const initialState: Setting = {
  workSec:  1500,
  restSec:  300,
  longRest: 900,
  isMuted: false,
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
  },
})

export const selectSetting = (state: RootState): Setting => state.setting;
export const settingReducer = settingSlice.reducer;