import { configureStore } from '@reduxjs/toolkit'
import { timerReducer } from '../features/timer/timerSlice'
import { todosReducer } from '../features/todos/todoSlice'
import { settingReducer } from '../features/setting/Slices/settingSlice'
import { sessionReducer } from '../features/session/slices/sessionSlice'
import { recordsReducer } from '../features/records/recordsSlice'
import { visibleReducer } from '../features/display/visibleSlice'

export const store =  configureStore({
  reducer: {
    timer: timerReducer,
    todos: todosReducer,
    setting: settingReducer,
    session: sessionReducer,
    records: recordsReducer,
    visible: visibleReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
