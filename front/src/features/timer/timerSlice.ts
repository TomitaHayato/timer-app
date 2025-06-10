import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TimerMode, TimerState } from './types/timerType'
import type { RootState } from '../../reduxStore/store';

const initialState: TimerState = {
  mode: 'work',
  count: 0,
  status: false,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    switchTimer: (state: TimerState, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
    resetCount: (state: TimerState) => {
      state.mode  = initialState.mode;
      state.count = initialState.count;
    },
    // タイマーが0になった時の処理
    modeChange: (state: TimerState) => {
      // 休憩終了時
      if (state.mode === 'rest' || state.mode === 'longRest') {
        state.mode = 'work';
        console.log('modeChange', state.mode);
        return;
      }
      // 作業終了時
      state.count += 1
      if (state.count % 4 === 0) {
        state.mode = 'longRest'
      } else {
        state.mode = 'rest'
      }
      console.log('modeChange', state.mode);
    },
    // 強制的にモードを変更
    modeChangeForth: (state: TimerState, action: PayloadAction<TimerMode>) => {
      if (state.mode === action.payload) return;
      state.mode = action.payload;
    },
  }
})

export const selectTimer = (state: RootState): TimerState => state.timer;

export const {
  switchTimer,
  resetCount,
  modeChange,
  modeChangeForth,
} = timerSlice.actions;

export const timerReducer = timerSlice.reducer;
