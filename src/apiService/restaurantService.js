import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const getRestaurantsForListSlider = createAsyncThunk(
  'restaurantForListSlider',
  async (params, { rejectWithValue }) => {
    try {
      const response = await callApi('get', '/v1/shops', params, {});
      return response;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getRestaurants = createAsyncThunk('restaurant', async (params, { rejectWithValue }) => {
  try {
    const response = await callApi('get', '/v1/shops', params, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const getRestaurantsByCategory = createAsyncThunk(
  'getRestaurantByCategory',
  async ({ categoryId, params }, { rejectWithValue }) => {
    try {
      const response = await callApi('get', `/v1/shops/category/${categoryId}`, {});
      return response;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getRestaurantDetail = createAsyncThunk(
  'getRestaurantDetail',
  async ({ restaurantId }, { rejectWithValue }) => {
    try {
      const response = await callApi('get', `v1/shops/${restaurantId}/group-by-category`, {});
      return response;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);
