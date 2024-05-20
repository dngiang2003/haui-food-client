import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import Cookies from 'js-cookie';

export const captcha = createAsyncThunk('captcha', async (_, { rejectWithValue }) => {
  try {
    const response = await callApi('get', `/v1/captcha/generate?lang=${Cookies.get('lang')}`, null, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
