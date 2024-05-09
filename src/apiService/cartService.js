import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const addProductToCart = createAsyncThunk('addProductToCart', async (data, { rejectWithValue }) => {
  try {
    const response = await callApi('post', 'v1/carts/add-product', null, data);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
