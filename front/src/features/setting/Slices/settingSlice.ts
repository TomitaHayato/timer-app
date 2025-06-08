import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Setting, SettingParams, SettingState } from '../types/settingType'
import type { RootState } from '../../../reduxStore/store'
import { clientCredentials } from '../../../utils/axios'
import { defaultSetting } from '../defaultSetting'
import { checkAxiosErrorStatus } from '../../../utils/errorHandler/axiosError'
import { devLog } from '../../../utils/logDev'

const initialState: SettingState = {
  setting: defaultSetting,
  loading: false,
  error: null
}

export const updateSetting = createAsyncThunk<
  SettingParams,
  SettingParams,
  { rejectValue: string }
>('setting/udpate', async(params, thunkAPI) => {
  // パラメータの数値の値を保証する
  const safeParams: SettingParams = {
    ...params,
    workSec: Number(params.workSec),
    restSec: Number(params.restSec),
    longRestSec: Number(params.longRestSec),
    volume: Number(params.volume),
  }
  try {
    const res = await clientCredentials.put('/settings', safeParams);
    return res.data
  } catch(err) {
    let errorMessage = '設定の更新に失敗しました'
    if (checkAxiosErrorStatus(401, err)) errorMessage = 'ログインが必要です';
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    // ステートを更新
    replaceSetting: (state, action: PayloadAction<Setting>) => {
      const { workSec, restSec, longRestSec, volume, isMuted } = action.payload;
      if (!workSec || !restSec || !longRestSec || !volume || isMuted === null || isMuted === undefined) {
        return;
      }
      devLog('setting更新:', state.setting)
      state.setting.workSec = workSec
      state.setting.restSec = restSec
      state.setting.longRestSec = longRestSec
      state.setting.volume = volume
      state.setting.isMuted= isMuted
    }
  },
  extraReducers: builder => {
    builder
      .addCase(updateSetting.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(updateSetting.fulfilled, (state, action: PayloadAction<Setting>) => {
        state.loading = false;
        const { workSec, restSec, longRestSec, volume, isMuted } = action.payload;
        if (!workSec || !restSec || !longRestSec || !volume || !isMuted) return;

        state.setting.workSec = workSec
        state.setting.restSec = restSec
        state.setting.longRestSec = longRestSec
        state.setting.volume = volume
        state.setting.isMuted= isMuted
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '設定の更新に失敗しました'
      })
  }
})

export const {
  replaceSetting
} = settingSlice.actions

export const selectSetting = (state: RootState): Setting => state.setting.setting;
export const selectSettingError = (state: RootState): string | null => state.setting.error;
export const selectSettingLoading = (state: RootState): boolean => state.setting.loading
export const settingReducer = settingSlice.reducer;