import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const captcha = createAsyncThunk('captcha', async (_, { rejectWithValue }) => {
  try {
    const response = await callApi('get', '/v1/captcha/generate', null, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
