import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const statistical = createAsyncThunk('statistical', async (_, { rejectWithValue }) => {
  try {
    const response = await callApi('get', 'https://haui-food-api.onrender.com/health-check', null, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
