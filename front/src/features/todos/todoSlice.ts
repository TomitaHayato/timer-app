import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Todo, TodoAddParams, Todos, TodosState, TodoUpdateParams } from '../../types/todoType'
import type { AppDispatch, RootState } from '../../reduxStore/store';
import { defaultTodos } from './defaultTodos';
import { devLog } from '../../utils/logDev';
import { getAxiosErrorMessageFromStatusCode } from '../../utils/errorHandler/axiosError';
import { sortTodosByDeadline, sortTodosByIsCompleted } from './utils/todosSort';
import { fetchWithTokenRefresh } from '../../utils/fetch/fetchWithTokenRefresh';
import { INVALID_REFRESH_TOKEN } from '../../utils/apiErrors/errorMessages';
import { resetStateOfUser } from '../auth/slices/authSlice';
import { filterByDeadline } from './utils/todosFilter';

const initialState: TodosState = {
  todos: defaultTodos(),
  loading: false,
  error: null,
}

export const createTodo = createAsyncThunk<
  Todos,
  TodoAddParams,
  {
    rejectValue: string,
    dispatch: AppDispatch,
  }
>('todos/create', async(params, thunkAPI) => {
  try {
    const res = await fetchWithTokenRefresh('/todos', 'post', params);
    const todos: Todos = res.data;
    if (!todos) return thunkAPI.rejectWithValue('todosの取得に失敗しました');
    return todos;
  } catch(err) {
    // AccessTokenとRefreshTokenが期限切れの場合、ステートをリセット
    if (err instanceof Error && err.message === INVALID_REFRESH_TOKEN ) thunkAPI.dispatch(resetStateOfUser());

    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'Todoの作成に失敗しました');
    return thunkAPI.rejectWithValue(errorMessage);
  }
})

export const updateTodo = createAsyncThunk<
  Todos,
  {
    params: TodoUpdateParams,
  },
  {
    rejectValue: string,
    dispatch: AppDispatch,
  }
>('todos/update', async(data, thunkAPI) => {
  const { params } = data;
  try {
    const res = await fetchWithTokenRefresh(`/todos/${params.id}`, 'put', params);
    const todos: Todos = res.data;
    if (!todos) return thunkAPI.rejectWithValue('todosの取得に失敗しました');
    return todos;
  } catch(err) {
    // AccessTokenとRefreshTokenが期限切れの場合、ログインユーザーに関するステートをリセット
    if (err instanceof Error && err.message === INVALID_REFRESH_TOKEN ) thunkAPI.dispatch(resetStateOfUser());

    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'Todoの作成に失敗しました');
    return thunkAPI.rejectWithValue(errorMessage);
  }
})

export const deleteTodo = createAsyncThunk<
  Todos,
  string,
  {
    rejectValue: string,
    dispatch: AppDispatch,
  }
>('todos/delete', async(todoId, thunkAPI) => {
  try{
    const res = await fetchWithTokenRefresh(`/todos/${todoId}`, 'delete');
    const todos = res.data;
    if (!todos) return thunkAPI.rejectWithValue('todosの削除に失敗しました');
    return todos;
  } catch(err) {
    // AccessTokenとRefreshTokenが期限切れの場合、ステートをリセット
    if (err instanceof Error && err.message === INVALID_REFRESH_TOKEN ) thunkAPI.dispatch(resetStateOfUser());
    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'Todoの削除に失敗しました');
    return thunkAPI.rejectWithValue(errorMessage);
  }
})

export const updateTodoIsCompleted = createAsyncThunk<
  Todos,
  string,
  {
    rejectValue: string,
    dispatch: AppDispatch,
  }
>('todos/isCompleted', async(todoId, thunkAPI) => {
  try {
    const res = await fetchWithTokenRefresh(`/todos/${todoId}/is_completed`, 'put');
    const todos = res.data;
    devLog('Todos取得', todos)
    if (!todos) return thunkAPI.rejectWithValue('todosの更新に失敗しました');
    return todos;
  } catch(err) {
    // AccessTokenとRefreshTokenが期限切れの場合、ステートをリセット
    if (err instanceof Error && err.message === INVALID_REFRESH_TOKEN ) thunkAPI.dispatch(resetStateOfUser());
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
    resetTodosState: (state: TodosState) => {
      state.todos = defaultTodos();
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
    //Todo更新処理
    .addCase(updateTodo.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todos>) => {
      state.loading = false;
      state.todos = action.payload;
    })
    .addCase(updateTodo.rejected, (state, action) => {
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
export const selectTodayTodos = (state: RootState) => sortTodosByIsCompleted(filterByDeadline(state.todos.todos, new Date()));

export const {
  replaceTodos,
  resetTodosState,
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
