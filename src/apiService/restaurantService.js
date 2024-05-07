import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const getRestaurants = createAsyncThunk('restaurant/', async (params, { rejectWithValue }) => {
  try {
    // console.log(params);
    const response = await callApi('get', '/v1/shops', params, {});
    if (response.code === 200) {
    }

    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const getRestaurantsByCategory = createAsyncThunk(
  'getRestaurantByCategory',
  async ({ categoryId, params }, { rejectWithValue }) => {
    try {
      console.log(params);
      const response = await callApi('get', `/v1/shops/category/${categoryId}`, {});
      if (response.code === 200) {
      }

      return response;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);
