import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import Cookies from 'js-cookie';

export const searchProduct = createAsyncThunk('productSearch', async (params, { rejectWithValue }) => {
  try {
    const response = await callApi('get', `v1/restaurants/search?lang=${Cookies.get('lang')}`, params, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
