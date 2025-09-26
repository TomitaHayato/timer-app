import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../../../reduxStore/store";
import type { AuthState, SigninParams, SignupParams, User, UserAndCsrfToken } from "../../../types/auth";
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
import type { TermsRecords } from "../../../types/records";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  csrfToken: null,
  loading: false,
  error: null,
}

// ログインユーザーに関するステートをリセットする同期Thunk
export const resetStateOfUser = () => (dispatch: AppDispatch) => {
  devLog('ログインユーザーに関するステートを削除');
  const resetThunks = [
    resetAuthState(),
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
  UserAndCsrfToken,
  SigninParams,
  { rejectValue: string }
>(
  'auth/signin',
  async(params, thunkAPI) => {
    try {
      const res = await clientCredentials.post('/auth/signin', params);
      devLog('signinのres.headers: ', res.headers);

      const { userData, recordsData } = res.data;
      const csrfToken = res.headers["x-csrf-token"];
      if (!userData || !recordsData || !csrfToken) return thunkAPI.rejectWithValue('renponseData is lost');
      // devLog('UserData:', userData);
      // devLog('recordsData:', recordsData);
      // devLog('csrfToken:', csrfToken);

      // 各スライスにデータを配分
      const setting = userData.setting || defaultSetting();
      const records = recordsData || defaultRecords();
      const todos = userData.todos || defaultTodos();
      thunkAPI.dispatch(replaceSetting(setting));
      thunkAPI.dispatch(replaceRecords(records));
      thunkAPI.dispatch(replaceTodos(todos));

      return {
        user: {
          email: userData.email,
          name: userData.name,
        },
        csrfToken,
      }
    } catch(err) {
      const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'ログインに失敗しました');
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export const signup = createAsyncThunk<
  UserAndCsrfToken,
  SignupParams,
  { rejectValue: string }
>('auth/signup', async(params, thunkAPI) => {
  try {
    const res = await clientCredentials.post('/auth/signup', params);
    devLog('signupのres:', res);

    // responseデータを取得
    const { userData, recordsData }: { userData?: UserData, recordsData?: TermsRecords } = res.data;
    const csrfToken = res.headers["x-csrf-token"];
    if (!userData || !recordsData || !csrfToken) return thunkAPI.rejectWithValue('renponseData is lost');
    // devLog('UserData:', userData);
    // devLog('recordsData:', recordsData);
    // devLog('csrfToken:', csrfToken);

    // 各スライスにデータを配分
    const setting = userData.setting || defaultSetting();
    const records = recordsData || defaultRecords();
    const todos = userData.todos || defaultTodos();
    thunkAPI.dispatch(replaceSetting(setting));
    thunkAPI.dispatch(replaceRecords(records));
    thunkAPI.dispatch(replaceTodos(todos));

    return {
      user: {
        email: userData.email,
        name: userData.name,
      },
      csrfToken,
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
>('auth/signout', async(_, thunkAPI) => {
  try {
    await fetchWithTokenRefresh('/auth/signout', 'delete');
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
  UserAndCsrfToken,
  undefined,
  { rejectValue: string }
>('auth/check', async(_, thunkAPI) => {
  try {
    const res = await fetchWithTokenRefresh('/auth/check', 'get');

    // レスポンスデータを取得
    const { userData, recordsData } = res.data;
    const csrfToken = res.headers["x-csrf-token"];
    if (!userData || !recordsData ||  !csrfToken) return thunkAPI.rejectWithValue('auth/check responseData is lost');
    // devLog(csrfToken);
    // devLog('userData:', userData);
    // devLog('recordsData:', recordsData);

    // 関連データをステートにセット
    const setting = userData.setting || defaultSetting();
    const todos = userData.todos || defaultTodos();
    const records = recordsData || defaultRecords();
    thunkAPI.dispatch(replaceSetting(setting));
    thunkAPI.dispatch(replaceRecords(records));
    thunkAPI.dispatch(replaceTodos(todos));

    return {
      user: {
        name: userData.name,
        email: userData.email,
      },
      csrfToken,
    }
  } catch(err) {
    devLog('auth/checkのエラー：', err);
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
>('auth/updateUser', async(params, thunkAPI) => {
  try {
    const res = await fetchWithTokenRefresh('/users', 'put', params);
    return res.data;
  } catch(err) {
    devLog('auth/updateUserのエラー：', err);
    if (err instanceof Error && err.message === INVALID_REFRESH_TOKEN ) {
      // AccessTokenとRefreshTokenが期限切れの場合、ステートをリセット
      thunkAPI.dispatch(resetStateOfUser());
    }
    const errorMessage = getAxiosErrorMessageFromStatusCode(err, 'サーバとの通信に失敗しました');
    devLog(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // トークンの有効期限切れの際にdispatch
    resetAuthState: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.csrfToken = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signin.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(signin.fulfilled, (state, action: PayloadAction<UserAndCsrfToken>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.csrfToken = action.payload.csrfToken;
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
      .addCase(signup.fulfilled, (state, action: PayloadAction<UserAndCsrfToken>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.csrfToken = action.payload.csrfToken;
        state.isAuthenticated = true;
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
        state.csrfToken = null;
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
      .addCase(checkAuthToken.fulfilled, (state, action:PayloadAction<UserAndCsrfToken>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.csrfToken = action.payload.csrfToken;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthToken.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.csrfToken = null;
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

export const selectSessionError = (state: RootState) => state.auth.error
export const selectSessionLoading = (state: RootState) => state.auth.loading
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.isAuthenticated

export const {
  resetAuthState,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
