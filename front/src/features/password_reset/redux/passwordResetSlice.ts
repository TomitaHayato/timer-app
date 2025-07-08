import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { passwordForgetParams, passwordResetState } from "../types/password_reset";
import { clientCredentials } from "../../../utils/axios";
import { devLog } from "../../../utils/logDev";
import type { RootState } from "../../../reduxStore/store";

const initialState: passwordResetState = {
  token: null,
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
      return thunkAPI.rejectWithValue('パスワードリセット申請に失敗しました');
    }
  },
);

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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
  },
})

export const selectPasswordResetLoading = (state: RootState) => state.passwordReset.loading;

export const passwordResetReducer = passwordResetSlice.reducer;
