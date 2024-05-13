import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import sleep from '~/utils/sleep';

export const getOrder = createAsyncThunk('getOrder', async (params, { rejectWithValue }) => {
  try {
    const response = await callApi('get', 'v1/orders/me', params, {});
    // await sleep(5000);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
