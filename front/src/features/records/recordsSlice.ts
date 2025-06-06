import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultRecords } from "./defaultRecords";
import type { RecordsState, TermsRecords } from "./types/records";
import type { RootState } from "../../reduxStore/store";

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
      const { todayRecord, weeklyRecord, monthlyRecord, totalRecord } = action.payload;
      if (!todayRecord || !weeklyRecord || !monthlyRecord || !totalRecord) return

      state.records.todayRecord = todayRecord;
      state.records.weeklyRecord = weeklyRecord
      state.records.monthlyRecord = monthlyRecord
      state.records.totalRecord = totalRecord;
    },
  }
});

export const selectRecords = (state: RootState) => state.records.records

export const {
  replaceRecords
} = recordsSlice.actions;

export const recordsReducer = recordsSlice.reducer
