import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import Cookies from 'js-cookie';

export const searchProduct = createAsyncThunk('productSearch', async (params, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('get', `v1/restaurants/search`, params, {}, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
