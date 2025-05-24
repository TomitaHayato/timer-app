import { configureStore } from '@reduxjs/toolkit'
import { timerReducer } from '../features/timer/timerSlice'
import { todosReducer } from '../features/todos/todoSlice'
import { settingReducer } from '../features/setting/Slices/settingSlice'

export const store =  configureStore({
  reducer: {
    timer: timerReducer,
    todos: todosReducer,
    setting: settingReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
