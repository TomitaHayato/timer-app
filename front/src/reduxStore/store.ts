import { configureStore } from '@reduxjs/toolkit'
import { timerReducer } from '../features/timer/timerSlice'

export default configureStore({
  reducer: {
    timer: timerReducer,
  }
})
