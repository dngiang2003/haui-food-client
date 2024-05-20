import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import Cookies from 'js-cookie';

export const createOrder = createAsyncThunk('createOrder', async (data, { rejectWithValue }) => {
  try {
    const response = await callApi('post', `v1/orders?lang=${Cookies.get('lang')}`, null, data);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
