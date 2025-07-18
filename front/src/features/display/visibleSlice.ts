import { createSlice } from "@reduxjs/toolkit";
import type { visibleState } from "./visibla";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../reduxStore/store";

const initialState: visibleState = {
  visible: true, // Timer以外の要素をUIに表示するか
  simpleBg: false, // シンプル背景をONにするか
}

export const visibleSlice = createSlice({
  name: 'visible',
  initialState,
  reducers: {
    // 表示非表示を切り替え
    changeVisible: (state: visibleState, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    changeSimpleBg: (state: visibleState, action: PayloadAction<boolean>) => {
      state.simpleBg = action.payload
    }
  },
});

export const selectVisible = (state: RootState) => state.visible.visible;
export const selectSimpleBg = (state: RootState) => state.visible.simpleBg;
// tailwindのclassNameを返す
export const selectVisibleClass = (state: RootState) => state.visible.visible ? "visible" : "invisible";

export const {
  changeVisible,
  changeSimpleBg,
} = visibleSlice.actions;

export const visibleReducer = visibleSlice.reducer;
