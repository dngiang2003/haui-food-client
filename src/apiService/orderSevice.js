import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import sleep from '~/utils/sleep';
import Cookies from 'js-cookie';

export const getOrder = createAsyncThunk('getOrder', async (params, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('get', `v1/orders/me`, params, {}, customHeaders);
    // await sleep(5000);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const cancelOrder = createAsyncThunk('cancelOrder', async (orderID, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('post', `v1/orders/${orderID}/cancel`, null, {}, customHeaders);
    // await sleep(5000);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
