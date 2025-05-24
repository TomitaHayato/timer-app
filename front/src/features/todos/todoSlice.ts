import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Todo, TodoAdd, Todos } from './types/todoType'
import type { RootState } from '../../reduxStore/store';

const initialState: Todos = [
  {
    id: 1,
    title: 'Todo1',
    status: false,
  },
  {
    id: 2,
    title: 'Todo2',
    status: false,
  },
  {
    id: 3,
    title: 'Todo3',
    status: true,
  },
]

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state: Todos, action: PayloadAction<TodoAdd>) => {
      const id = state[state.length - 1].id + 1
      action.payload.id = id
      action.payload.status = false;
      state.push(action.payload);
    },
    remove: (state: Todos, action: PayloadAction<number>) => {
      const target = state.find(todo => todo.id = action.payload);
      if (!target) return;

      state = state.filter(todo => todo !== target);
      console.log('削除しました', target);
    },
    completeTodo: (state: Todos, action: PayloadAction<number>) => {
      const id = action.payload
      state = state.map(todo => {
        if(todo.id === id) todo.status = !todo.status
        return todo
      })
    },
  },
})

export const selectTodos = (state: RootState) => state.todos;
export const selectTodosCompleted = (state: RootState) => {
  return state.todos.filter((todo: Todo) => todo.status)
}
export const selectTodosUncompleted = (state: RootState) => {
  return state.todos.filter((todo: Todo) => !todo.status)
}

export const {
  add,
  remove,
  completeTodo,
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
