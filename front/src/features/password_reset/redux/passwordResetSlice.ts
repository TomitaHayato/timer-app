import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { paramsForPasswordUpdate, passwordForgetParams, passwordResetState, tokenAndIdForPasswordReset } from "../types/password_reset";
import { clientCredentials } from "../../../utils/axios";
import { devLog } from "../../../utils/logDev";
import type { RootState } from "../../../reduxStore/store";
import { getAxiosErrorMessageFromStatusCode } from "../../../utils/errorHandler/axiosError";

const initialState: passwordResetState = {
  tokenStatus: 'idle',
  loading: false,
  error: null,
}

// メール送信を申請する
export const fetchPasswordResetRequest = createAsyncThunk<
  undefined,
  passwordForgetParams,
  { rejectValue: string }
>(
  'passowrd_reset/password_forget', async(params, thunkAPI) => {
    try {
      await clientCredentials.post('/password_reset/send_mail', params, { timeout: 5000 });
    } catch(err) {
      devLog('fetchPasswordResetRequestのエラー:', err);
      const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'パスワードリセット申請に失敗しました')
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

// パスワードリセットトークンの検証APIにfetch
export const fetchCheckPasswordResetToken = createAsyncThunk<
  undefined,
  tokenAndIdForPasswordReset,
  { rejectValue: string }
>(
  'passowrd_reset/check_token', async(data, thunkAPI) => {
    const { id, token } = data;
    try {
      const res = await clientCredentials.post('password_reset/token_check', { id, token });
      devLog('password_reset/check_tokenのResponse:', res);
      return;
    } catch(err) {
      devLog('fetchCheckPasswordResetTokenのエラー:', err);
      const errorMessage = getAxiosErrorMessageFromStatusCode(err, '権限が確認できませんでした')
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)

// パスワード更新リクエスト
export const fetchUpdateUserPassword = createAsyncThunk<
  undefined,
  paramsForPasswordUpdate,
  { rejectValue: string }
>(
  'password_reset/password_update', async(params, thunkAPI) => {
    try {
      const res = await clientCredentials.put('/password_reset/password_update', params);
      devLog('PUT /password_reset/password_updateのResponse：', res);
      return
    } catch(err) {
      devLog('PUT /password_reset/password_updateのエラー：', err);
      const errorMessage = getAxiosErrorMessageFromStatusCode(err, '権限が確認できませんでした')
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {
    resetPasswordResetTokenStatus: (state) => {
      state.tokenStatus = 'idle';
    },
  },
  extraReducers(builder) {
    builder
    // パスワードリセット申請
    .addCase(fetchPasswordResetRequest.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(fetchPasswordResetRequest.fulfilled, (state) => {
      state.loading = false
    })
    .addCase(fetchPasswordResetRequest.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Unexpected error';
    })
    // chack_token
    .addCase(fetchCheckPasswordResetToken.pending, (state) => {
      state.loading = true
      state.tokenStatus = 'checking'
      state.error = null
    })
    .addCase(fetchCheckPasswordResetToken.fulfilled, (state) => {
      state.tokenStatus = 'valid'
      state.loading = false
    })
    .addCase(fetchCheckPasswordResetToken.rejected, (state, action) => {
      state.tokenStatus = 'invalid'
      state.loading = false
      state.error = action.payload || 'Unexpected error';
    })
    // パスワード更新
    .addCase(fetchUpdateUserPassword.pending, (state) => {
      state.loading = true
      state.tokenStatus = 'checking'
      state.error = null
    })
    .addCase(fetchUpdateUserPassword.fulfilled, (state) => {
      state.tokenStatus = 'used';
      state.loading = false
    })
    .addCase(fetchUpdateUserPassword.rejected, (state, action) => {
      state.tokenStatus = 'invalid'
      state.loading = false
      state.error = action.payload || 'Unexpected error';
    })
  },
})

export const selectPasswordResetLoading = (state: RootState) => state.passwordReset.loading;
export const selectPasswordResetState = (state: RootState) => state.passwordReset;

export const {
  resetPasswordResetTokenStatus,
} = passwordResetSlice.actions;

export const passwordResetReducer = passwordResetSlice.reducer;
