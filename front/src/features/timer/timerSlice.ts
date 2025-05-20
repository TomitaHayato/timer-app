import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { TimerState, TimerStatePayload } from './types/timerType'
import type { RootState } from '../../reduxStore/store';

const initialState: TimerState = {
  workSec:  1500,
  restSec:  300,
  longRest: 900,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    // 秒数を変更する処理
    update: (state: TimerState, action: PayloadAction<TimerStatePayload>) => {
      const { workSec, restSec, longRest } = action.payload;
      state.workSec = workSec
      state.restSec = restSec
      state.longRest = longRest
    },
    reset: (state: TimerState) => {
      state.workSec  = initialState.workSec;
      state.restSec  = initialState.restSec;
      state.longRest = initialState.longRest;
    }
  }
})

export const selectTimer = (state: RootState): TimerState => state.timer;

export const {
  update,
  reset,
} = timerSlice.actions;

export const timerReducer = timerSlice.reducer;
