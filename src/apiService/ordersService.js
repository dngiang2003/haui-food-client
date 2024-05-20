import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import Cookies from 'js-cookie';

export const createOrder = createAsyncThunk('createOrder', async (data, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('post', `v1/orders`, null, data, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
