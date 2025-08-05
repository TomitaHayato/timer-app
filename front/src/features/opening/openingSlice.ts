import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../reduxStore/store";

const initialState = {
  status: true,
}

// オープニングコンポーネントを表示するかどうか
export const openingSlice = createSlice({
  name: 'visible',
  initialState,
  reducers: {
    // 表示非表示を切り替え
    openingEnd: (state) => {
      state.status = false;
    },
  },
});

export const selectIsOpening = (state: RootState) => state.opening.status

export const {
  openingEnd
} = openingSlice.actions;

export const openingReducer = openingSlice.reducer;