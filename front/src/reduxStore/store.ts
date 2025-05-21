import { configureStore } from '@reduxjs/toolkit'
import { timerReducer } from '../features/timer/timerSlice'
import { todosReducer } from '../features/todos/todoSlice'

export const store =  configureStore({
  reducer: {
    timer: timerReducer,
    todos: todosReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
