import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Todo, TodoAddParams, Todos, TodosState } from './types/todoType'
import type { RootState } from '../../reduxStore/store';
import { defaultTodos } from './defaultTodos';
import { devLog } from '../../utils/logDev';
import { getAxiosErrorMessageFromStatusCode } from '../../utils/errorHandler/axiosError';
import { sortTodosByDeadline } from './utils/todosSort';
import { fetchWithTokenRefresh } from '../../utils/asyncFetch/fetchWithTokenRefresh';

const initialState: TodosState = {
  todos: defaultTodos,
  loading: false,
  error: null,
}

export const createTodo = createAsyncThunk<
  Todos,
  TodoAddParams,
  { rejectValue: string }
>('todos/create', async(params, thunkAPI) => {
  try {
    const res = await fetchWithTokenRefresh('/todos', 'post', params);
    const todos: Todos = res.data;
    if (!todos) return thunkAPI.rejectWithValue('todosの取得に失敗しました');
    return todos;
  } catch(err) {
    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'Todoの作成に失敗しました');
    return thunkAPI.rejectWithValue(errorMessage);
  }
})

export const deleteTodo = createAsyncThunk<
  Todos,
  string,
  { rejectValue: string }
>('todos/delete', async(todoId, thunkAPI) => {
  try{
    const res = await fetchWithTokenRefresh(`/todos/${todoId}`, 'delete');
    const todos = res.data;
    if (!todos) return thunkAPI.rejectWithValue('todosの削除に失敗しました');
    return todos;
  } catch(err) {
    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'Todoの削除に失敗しました');
    return thunkAPI.rejectWithValue(errorMessage);
  }
})

export const updateTodoIsCompleted = createAsyncThunk<
  Todos,
  string,
  { rejectValue: string }
>('todos/isCompleted', async(todoId, thunkAPI) => {
  try {
    const res = await fetchWithTokenRefresh(`/todos/${todoId}/is_completed`, 'put');
    const todos = res.data;
    devLog('res.data', todos)
    if (!todos) return thunkAPI.rejectWithValue('todosの更新に失敗しました');
    return todos;
  } catch(err) {
    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'Todoの更新に失敗しました');
    return thunkAPI.rejectWithValue(errorMessage);
  }
})

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
  },
  extraReducers: builder => {
    builder
    .addCase(createTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todos>) => {
      state.loading = false;
      state.todos = action.payload;
    })
    .addCase(createTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Todoの作成に失敗しました';
    })
    .addCase(deleteTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<Todos>) => {
      state.loading = false;
      state.todos = action.payload;
    })
    .addCase(deleteTodo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Todoの削除に失敗しました';
    })
    .addCase(updateTodoIsCompleted.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateTodoIsCompleted.fulfilled, (state, action: PayloadAction<Todos>) => {
      state.loading = false;
      state.todos = action.payload;
    })
    .addCase(updateTodoIsCompleted.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Todoの更新に失敗しました';
    })
  }
})

export const selectTodos = (state: RootState) => state.todos;
// 期限順でtodosを取得
export const selectSortedTodos = (state: RootState) => sortTodosByDeadline(state.todos.todos);
export const selectTodosCompleted = (state: RootState) => sortTodosByDeadline(state.todos.todos).filter((todo: Todo) => todo.isCompleted)
export const selectTodosUncompleted = (state: RootState) => sortTodosByDeadline(state.todos.todos).filter((todo: Todo) => !todo.isCompleted)

export const {
  replaceTodos
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
