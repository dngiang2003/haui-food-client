import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const searchProduct = createAsyncThunk('productSearch', async (params, { rejectWithValue }) => {
  try {
    const response = await callApi('get', 'v1/restaurants/search', params, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
