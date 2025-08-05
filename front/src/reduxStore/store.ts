import { configureStore } from '@reduxjs/toolkit'
import { timerReducer } from '../features/timer/timerSlice'
import { todosReducer } from '../features/todos/todoSlice'
import { settingReducer } from '../features/setting/Slices/settingSlice'
import { sessionReducer } from '../features/session/slices/sessionSlice'
import { recordsReducer } from '../features/records/recordsSlice'
import { visibleReducer } from '../features/display/visibleSlice'
import { passwordResetReducer } from '../features/password_reset/redux/passwordResetSlice'
import { openingReducer } from '../features/opening/openingSlice'

export const store =  configureStore({
  reducer: {
    timer: timerReducer,
    todos: todosReducer,
    setting: settingReducer,
    session: sessionReducer,
    records: recordsReducer,
    visible: visibleReducer,
    passwordReset: passwordResetReducer,
    opening: openingReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
