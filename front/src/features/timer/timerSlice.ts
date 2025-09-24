import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TimerMode, TimerState } from '../../types/timerType'
import type { RootState } from '../../reduxStore/store';
import { devLog } from '../../utils/logDev';

const initialState: TimerState = {
  mode: 'work',
  count: 0,
  status: false,
  totalSec: 0,
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
    modeChange: (state: TimerState, action: PayloadAction<number>) => {
      const workSec = action.payload
      // 休憩終了時
      if (state.mode === 'rest' || state.mode === 'longRest') {
        state.mode = 'work';
        devLog('modeChange', state.mode);
        return;
      }
      // 作業終了時
      state.count += 1
      state.totalSec += workSec;
      if (state.count % 4 === 0) {
        state.mode = 'longRest'
      } else {
        state.mode = 'rest'
      }
      devLog('modeChange', state.mode);
    },
    // 強制的にモードを変更
    modeChangeForth: (state: TimerState, action: PayloadAction<TimerMode>) => {
      // 指定されたModeが現在のModeと一致 => 何もしない
      if (state.mode === action.payload) return;
      // 集中 => 休憩の変更時、カウントを+1
      if(state.mode === 'work') state.count += 1;

      state.mode = action.payload;
      // 指定されたModeが長期休憩の場合、カウントをリセット
      if(action.payload === 'longRest') state.count = 0;
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
