import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../../reduxStore/store";
import type { SessionState, SigninParams, SignupParams, User } from "../types/session";
import { clientCredentials } from "../../../utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { replaceSetting, resetSettingState } from "../../setting/Slices/settingSlice";
import { replaceRecords, resetRecordsState } from "../../records/recordsSlice";
import { replaceTodos, resetTodosState } from "../../todos/todoSlice";
import { defaultSetting } from "../../setting/defaultSetting";
import { defaultRecords } from "../../records/defaultRecords";
import { defaultTodos } from "../../todos/defaultTodos";
import { devLog } from "../../../utils/logDev";
import { getAxiosErrorMessageFromStatusCode } from "../../../utils/errorHandler/axiosError";
import { fetchWithTokenRefresh } from "../../../utils/fetch/fetchWithTokenRefresh";
import { INVALID_REFRESH_TOKEN } from "../../../utils/apiErrors/errorMessages";
import type { UserData } from "../../../types/dataFromAPI";
import type { TermsRecords } from "../../records/types/records";

const initialState: SessionState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// ログインユーザーに関するステートをリセットする同期Thunk
export const resetStateOfUser = () => (dispatch: AppDispatch) => {
  devLog('ログインユーザーに関するステートを削除');
  const resetThunks = [
    resetSessionState(),
    resetRecordsState(),
    resetSettingState(),
    resetTodosState(),
  ]
  resetThunks.forEach(thunk => {
    dispatch(thunk);
  });
  return;
}

export const signin = createAsyncThunk<
  User,
  SigninParams,
  { rejectValue: string }
>(
  'session/signin',
  async(params, thunkAPI) => {
    try {
      const res = await clientCredentials.post('/auth/signin', params);
      devLog('signinのres.data: ', res.data);
      const { userData, recordsData } = res.data;
      if (!userData) return thunkAPI.rejectWithValue('userData is null');
      devLog('UserData:', userData);

      // 各スライスにデータを配分
      const setting = userData.setting || defaultSetting();
      const records = recordsData || defaultRecords();
      const todos = userData.todos || defaultTodos()

      thunkAPI.dispatch(replaceSetting(setting))
      thunkAPI.dispatch(replaceRecords(records))
      thunkAPI.dispatch(replaceTodos(todos))

      return {
        email: userData.email,
        name: userData.name,
      }
    } catch(err) {
      const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'ログインに失敗しました');
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const signup = createAsyncThunk<
  User,
  SignupParams,
  { rejectValue: string }
>('session/signup', async(params, thunkAPI) => {
  try {
    const res = await clientCredentials.post('/auth/signup', params);
    devLog('signupのres:', res);
    const { userData, recordsData }: { userData?: UserData, recordsData?: TermsRecords } = res.data;
    if (!userData) return thunkAPI.rejectWithValue('userData is null');

    devLog('UserData:', userData)
    // 各スライスにデータを配分
    const setting = userData.setting || defaultSetting();
    const records = recordsData || defaultRecords();
    const todos = userData.todos || defaultTodos()

    thunkAPI.dispatch(replaceSetting(setting))
    thunkAPI.dispatch(replaceRecords(records))
    thunkAPI.dispatch(replaceTodos(todos))

    return {
      email: userData.email,
      name: userData.name,
    }
  } catch(err) {
    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'サインアップに失敗しました');
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const signout = createAsyncThunk<
  undefined,
  undefined,
  {
    rejectValue: string,
    dispatch: AppDispatch,
  }
>('session/signout', async(_, thunkAPI) => {
  try {
    await fetchWithTokenRefresh('/auth/signout', 'get');
    // 他のStateをリセット
    thunkAPI.dispatch(replaceSetting(defaultSetting()))
    thunkAPI.dispatch(replaceRecords(defaultRecords()))
    thunkAPI.dispatch(replaceTodos(defaultTodos()))
  } catch(err) {
    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'ログアウトに失敗しました');
    if (err instanceof Error && err.message === INVALID_REFRESH_TOKEN ) {
      // AccessTokenとRefreshTokenが期限切れの場合、ステートをリセット
      thunkAPI.dispatch(resetStateOfUser());
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
})

// AccessTokenの検証エンドポイント。トップページマウント時に実行
export const checkAuthToken = createAsyncThunk<
  User,
  undefined,
  { rejectValue: string }
>('session/check', async(_, thunkAPI) => {
  try {
    const res = await fetchWithTokenRefresh('/auth/check', 'get');

    const { userData, recordsData } = res.data;
    if (!userData) return thunkAPI.rejectWithValue('userData is null');

    devLog('UserData:', userData)
    // 各スライスにデータを配分
    const setting = userData.setting || defaultSetting();
    const records = recordsData || defaultRecords;
    const todos = userData.todos || defaultTodos

    thunkAPI.dispatch(replaceSetting(setting))
    thunkAPI.dispatch(replaceRecords(records))
    thunkAPI.dispatch(replaceTodos(todos))

    return {
      email: userData.email,
      name: userData.name,
    }
  } catch(err) {
    devLog('session/checkのエラー：', err);
    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'サーバとの通信に失敗しました');
    devLog(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

// プロフィール更新
export const updateUser = createAsyncThunk<
  User,
  User,
  {
    rejectValue: string,
    dispatch: AppDispatch,
  }
>('session/updateUser', async(params, thunkAPI) => {
  try {
    const res = await fetchWithTokenRefresh('/users', 'put', params);
    return res.data;
  } catch(err) {
    devLog('session/updateUserのエラー：', err);
    if (err instanceof Error && err.message === INVALID_REFRESH_TOKEN ) {
      // AccessTokenとRefreshTokenが期限切れの場合、ステートをリセット
      thunkAPI.dispatch(resetStateOfUser());
    }
    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'サーバとの通信に失敗しました');
    devLog(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // トークンの有効期限切れの際にdispatch
    resetSessionState: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signin.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(signin.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const name = action.payload?.name
        const email = action.payload?.email
        if(!name || !email) return
        state.user = { name, email }
        state.isAuthenticated = true
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unexpected error';
      })
      // Sign Up
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const name = action.payload?.name;
        const email = action.payload?.email;
        if(!name || !email) return
        state.user = { name, email }
        state.isAuthenticated = true
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unexpected error';
      })
      //ログアウト
      .addCase(signout.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unexpected error';
      })
      // 認証確認
      .addCase(checkAuthToken.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(checkAuthToken.fulfilled, (state, action:PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthToken.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false
      })
      // User情報更新
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unexpected error';
      })
  }
});

export const selectSessionError = (state: RootState) => state.session.error
export const selectSessionLoading = (state: RootState) => state.session.loading
export const selectUser = (state: RootState) => state.session.user;
export const selectAuthStatus = (state: RootState) => state.session.isAuthenticated

export const {
  resetSessionState,
} = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
