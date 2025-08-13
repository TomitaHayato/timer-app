import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultRecords } from "./defaultRecords";
import type { PostRecordParams, RecordsState, TermsRecords } from "./types/records";
import type { AppDispatch, RootState } from "../../reduxStore/store";
import { devLog } from "../../utils/logDev";
import { getAxiosErrorMessageFromStatusCode } from "../../utils/errorHandler/axiosError";
import { fetchWithTokenRefresh } from "../../utils/fetch/fetchWithTokenRefresh";
import { INVALID_REFRESH_TOKEN } from "../../utils/apiErrors/errorMessages";
import { resetStateOfUser } from "../session/slices/sessionSlice";

const initialState: RecordsState = {
  records: defaultRecords(),
  loading: false,
  error: null,
}

// record作成処理
export const createRecord = createAsyncThunk<
  TermsRecords,
  PostRecordParams,
  {
    rejectValue: string,
    dispatch: AppDispatch,
  }
>('records/create', async(params, thunkAPI) => {
  try {
    const res = await fetchWithTokenRefresh('/records', 'post', params);
    const records = res.data;
    if (!records.dailyRecord || !records.weeklyRecord || !records.monthlyRecord || !records.totalRecord) {
      return thunkAPI.rejectWithValue('Recordの取得に失敗しました');
    }
    return records;
  } catch(err) {
    if (err instanceof Error && err.message === INVALID_REFRESH_TOKEN ) {
      // AccessTokenとRefreshTokenが期限切れの場合、ステートをリセット
      thunkAPI.dispatch(resetStateOfUser());
    }
    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'Recordの作成に失敗しました');
    return thunkAPI.rejectWithValue(errorMessage);
  }
})

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    replaceRecords: (state: RecordsState, action: PayloadAction<TermsRecords>) => {
      const { dailyRecord, weeklyRecord, monthlyRecord, totalRecord } = action.payload;
      if (!dailyRecord || !weeklyRecord || !monthlyRecord || !totalRecord) {
        devLog('不正なRecordがactionに渡されています', action.payload)
        return
      }

      devLog('records更新:', state.records)
      state.records.dailyRecord = dailyRecord;
      state.records.weeklyRecord = weeklyRecord
      state.records.monthlyRecord = monthlyRecord
      state.records.totalRecord = totalRecord;
    },
    resetRecordsState: (state: RecordsState) => {
      state.records = defaultRecords();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createRecord.pending, (state: RecordsState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecord.fulfilled, (state: RecordsState, action: PayloadAction<TermsRecords>) => {
        state.loading = false;
        state.records.dailyRecord = action.payload.dailyRecord;
        state.records.weeklyRecord = action.payload.weeklyRecord;
        state.records.monthlyRecord = action.payload.monthlyRecord;
        state.records.totalRecord = action.payload.totalRecord;
      })
      .addCase(createRecord.rejected, (state: RecordsState, action) => {
        state.loading = false;
        state.error = action.payload || 'Recordの作成に失敗しました';
      })
  },
});

export const selectRecords = (state: RootState) => state.records.records
export const selectDailyRecords = (state: RootState) => state.records.records.dailyRecord;

export const {
  replaceRecords,
  resetRecordsState,
} = recordsSlice.actions;

export const recordsReducer = recordsSlice.reducer
