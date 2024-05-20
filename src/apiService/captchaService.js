import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import Cookies from 'js-cookie';

export const captcha = createAsyncThunk('captcha', async (_, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('get', `/v1/captcha/generate`, null, {}, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
