import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../reduxStore/store";
import type { SessionState, signinParams, User } from "../types/session";
import { clientCredentials } from "../../../utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { replaceSetting } from "../../setting/Slices/settingSlice";
import { replaceRecords } from "../../records/recordsSlice";
import { replaceTodos } from "../../todos/todoSlice";

const initialState: SessionState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const signin = createAsyncThunk<
  User,
  signinParams,
  { rejectValue: string }
>(
  'session/signin',
  async(params, thunkAPI) => {
    try {
      const res = await clientCredentials.post('/auth/signin', params);
      const { userDataSet, recordsData } = res.data;
      if (!userDataSet)  return thunkAPI.rejectWithValue('userDataSet is null');

      // 各スライスにデータを配分
      const setting = userDataSet.setting;
      const records = recordsData;
      const todos = userDataSet.todos;
      if(!setting || !records || !todos) return thunkAPI.rejectWithValue('SignInに失敗しました');

      thunkAPI.dispatch(replaceSetting(setting))
      thunkAPI.dispatch(replaceRecords(records))
      thunkAPI.dispatch(replaceTodos(todos))

      return {
        email: userDataSet.email,
        name: userDataSet.name,
      }
    } catch(err) {
      // TODO: エラーをrejectedのactions.payloadに渡すには？？
      console.log(err)
      return thunkAPI.rejectWithValue('SignInに失敗しました')
    }
  }
)

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signin.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(signin.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;

        const name = action.payload?.name
        const email = action.payload?.name
        if(!name || !email) return

        state.user = { name, email }
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unexpected error';
      })
  }
});

export const selectUser = (state: RootState) => state.session;

export const sessionReducer = sessionSlice.reducer;
