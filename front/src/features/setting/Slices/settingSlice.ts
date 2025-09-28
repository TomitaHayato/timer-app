import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Setting, SettingParams, SettingState } from '../../../types/settingType'
import type { AppDispatch, RootState } from '../../../reduxStore/store'
import { defaultSetting } from '../defaultSetting'
import { getAxiosErrorMessageFromStatusCode } from '../../../utils/errorHandler/axiosError'
import { devLog } from '../../../utils/logDev'
import { authFetch } from '../../../utils/fetch/authFetch'
import { INVALID_REFRESH_TOKEN } from '../../../utils/apiErrors/errorMessages'
import { resetStateOfUser } from '../../auth/slices/authSlice'

const initialState: SettingState = {
  setting: defaultSetting(),
  loading: false,
  error: null
}

export const updateSetting = createAsyncThunk<
  SettingParams,
  SettingParams,
  {
    rejectValue: string,
    dispatch: AppDispatch,
  }
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
    const res = await authFetch('/settings', 'put', safeParams);
    devLog('Setting更新成功：', res.data);
    return res.data
  } catch(err) {
    if (err instanceof Error && err.message === INVALID_REFRESH_TOKEN ) {
      // AccessTokenとRefreshTokenが期限切れの場合、ステートをリセット
      thunkAPI.dispatch(resetStateOfUser());
    }
    const errorMessage: string = getAxiosErrorMessageFromStatusCode(err, '設定の更新に失敗しました')
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    // ステートを更新
    replaceSetting: (state, action: PayloadAction<Setting>) => {
      const { workSec, restSec, longRestSec, volume, isMuted, workingSound, bgImage } = action.payload;
      if (!workSec || !restSec || !longRestSec || volume === undefined || isMuted === null || isMuted === undefined) {
        return;
      }
      devLog('setting Replace:', action.payload)
      state.setting.workSec = workSec
      state.setting.restSec = restSec
      state.setting.longRestSec = longRestSec
      state.setting.volume = volume
      state.setting.isMuted= isMuted
      state.setting.workingSound = workingSound || 'default'
      state.setting.bgImage = bgImage || 'default'
    },
    resetSettingState: (state: SettingState) => {
      state.setting = defaultSetting();
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateSetting.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(updateSetting.fulfilled, (state, action: PayloadAction<Setting>) => {
        state.loading = false;
        const { workSec, restSec, longRestSec, volume, isMuted, workingSound, bgImage } = action.payload;
        if (!workSec || !restSec || !longRestSec || volume === undefined || isMuted === null || isMuted === undefined) return;

        state.setting.workSec = workSec
        state.setting.restSec = restSec
        state.setting.longRestSec = longRestSec
        state.setting.volume = volume
        state.setting.isMuted = isMuted
        state.setting.workingSound = workingSound || 'default'
        state.setting.bgImage = bgImage || 'default'
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '設定の更新に失敗しました'
      })
  }
})

export const {
  replaceSetting,
  resetSettingState,
} = settingSlice.actions

export const selectSettingState = (state: RootState): SettingState => state.setting;
export const selectSetting = (state: RootState): Setting => state.setting.setting;
export const selectSettingError = (state: RootState): string | null => state.setting.error;
export const selectSettingLoading = (state: RootState): boolean => state.setting.loading
export const settingReducer = settingSlice.reducer;