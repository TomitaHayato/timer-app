import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { TimerMode, TimerState, TimerStatePayload } from './types/timerType'
import type { RootState } from '../../reduxStore/store';

const initialState: TimerState = {
  mode:     'work',
  workSec:  5,
  restSec:  3,
  longRest: 9,
  count:    0,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    // 秒数を変更する処理
    update: (state: TimerState, action: PayloadAction<TimerStatePayload>) => {
      const { workSec, restSec, longRest } = action.payload;
      state.workSec  = workSec
      state.restSec  = restSec
      state.longRest = longRest
    },
    resetCount: (state: TimerState) => {
      state.mode  = initialState.mode;
      state.count = initialState.count;
    },
    // タイマーが0になった時の処理
    modeChange: (state: TimerState) => {
      console.log('modeChange')
      // 休憩終了時
      if (state.mode === 'rest' || state.mode === 'longRest') {
        state.mode = 'work';
        return;
      }
      // 作業終了時
      state.count += 1
      if (state.count % 4 === 0) {
        state.mode = 'longRest'
      } else {
        state.mode = 'rest'
      }
    },
    // 強制的にモードを変更
    modeChangeForth: (state: TimerState, action: PayloadAction<TimerMode>) => {
      if (state.mode === action.payload) return;
      state.mode = action.payload;
    },
  }
})

export const selectTimer = (state: RootState): TimerState => state.timer;

export const selectCurrentSec = (state: RootState): number => {
  const { mode, workSec, restSec, longRest } = state.timer;
  switch (mode) {
    case 'work':
      return workSec;
    case 'rest':
      return restSec;
    case 'longRest':
      return longRest;
    default:
      return 1500;
  }
}

export const {
  update,
  resetCount,
  modeChange,
  modeChangeForth,
} = timerSlice.actions;

export const timerReducer = timerSlice.reducer;
