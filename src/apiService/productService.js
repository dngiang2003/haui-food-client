import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const searchProduct = createAsyncThunk('productSearch', async (params, { rejectWithValue }) => {
  try {
    // console.log(params);

    // await sleep(15000);

    const response = await callApi('get', 'v1/restaurants/search', params, {});
    if (response.code === 200) {
    }

    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
