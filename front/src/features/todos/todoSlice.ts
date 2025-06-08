import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Todo, TodoAdd, Todos, TodosState } from './types/todoType'
import type { RootState } from '../../reduxStore/store';
import { defaultTodos } from './defaultTodos';
import { devLog } from '../../utils/logDev';

const initialTodos: Todos = defaultTodos;

const initialState: TodosState = {
  todos: initialTodos,
  loading: false,
  error: null,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    replaceTodos: (state: TodosState, action: PayloadAction<Todos>) => {
      const todos: Todos = action.payload;
      if(!todos) return;
      devLog('todos更新:', state.todos)
      state.todos = todos;
    },
    add: (state: TodosState, action: PayloadAction<TodoAdd>) => {
      state.todos.push({
        ...action.payload,
        status: false,
      });
    },
  },
})

export const selectTodos = (state: RootState) => state.todos;
export const selectTodosCompleted = (state: RootState) => {
  return state.todos.todos.filter((todo: Todo) => todo.status)
}
export const selectTodosUncompleted = (state: RootState) => {
  return state.todos.todos.filter((todo: Todo) => !todo.status)
}

export const {
  add,
  replaceTodos
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
