import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { timerReducer } from '../features/timer/timerSlice'
import { todosReducer } from '../features/todos/todoSlice'
import { settingReducer } from '../features/setting/Slices/settingSlice'
import { sessionReducer } from '../features/session/slices/sessionSlice'
import { recordsReducer } from '../features/records/recordsSlice'
import { visibleReducer } from '../features/display/visibleSlice'
import { passwordResetReducer } from '../features/password_reset/redux/passwordResetSlice'
import { openingReducer } from '../features/opening/openingSlice'

const rootReducers = combineReducers({
  timer: timerReducer,
  todos: todosReducer,
  setting: settingReducer,
  session: sessionReducer,
  records: recordsReducer,
  visible: visibleReducer,
  passwordReset: passwordResetReducer,
  opening: openingReducer,
})

export const store = configureStore({ reducer: rootReducers })

// テスト用, 毎回新しいstore Instanceを返す関数
export const setupStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: rootReducers,
  preloadedState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
