import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ContactFormParams, ContactState } from "../../types/contact";
import { client } from "../../utils/axios";
import { devLog } from "../../utils/logDev";
import type { RootState } from "../../reduxStore/store";

const initialState: ContactState = {
  loading: false,
  error: null,
}

export const sendContact = createAsyncThunk<
  void,
  ContactFormParams,
  { rejectValue: string }
>("contact/send", async(params, thunkAPI) => {
  try {
    await client('/contact', { method: 'post', params });
    return;
  } catch(err) {
    devLog("メール送信失敗：", err);
    return thunkAPI.rejectWithValue("メールの送信に失敗しました");
  }
});

const contactSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendContact.pending, state => {
        state.loading = true;
        state.error = null
      })
      .addCase(sendContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unexpected error';
      })
  }
});

export const selectContactState = (state: RootState) => state.contact;

export const contactReducer = contactSlice.reducer;