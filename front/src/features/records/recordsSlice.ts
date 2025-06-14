import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultRecords } from "./defaultRecords";
import type { RecordsState, TermsRecords } from "./types/records";
import type { RootState } from "../../reduxStore/store";
import { devLog } from "../../utils/logDev";

const initialState: RecordsState = {
  records: defaultRecords,
  loading: false,
  error: null,
}

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
  }
});

export const selectRecords = (state: RootState) => state.records.records
export const selectDailyRecords = (state: RootState) => state.records.records.dailyRecord;

export const {
  replaceRecords
} = recordsSlice.actions;

export const recordsReducer = recordsSlice.reducer
