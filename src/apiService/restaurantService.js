import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import sleep from '~/utils/sleep';
import Cookies from 'js-cookie';

export const getRestaurantsForListSlider = createAsyncThunk(
  'restaurantForListSlider',
  async (params, { rejectWithValue }) => {
    try {
      const response = await callApi('get', `/v1/shops?lang=${Cookies.get('lang')}`, params, {});
      return response;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);

export const getRestaurants = createAsyncThunk('restaurant', async (params, { rejectWithValue }) => {
  try {
    // await sleep(5000);
    const response = await callApi('get', `/v1/shops?lang=${Cookies.get('lang')}`, params, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const getRestaurantsByCategory = createAsyncThunk(
  'getRestaurantByCategory',
  async ({ categoryId, params }, { rejectWithValue }) => {
    try {
      // await sleep(5000);
      const response = await callApi('get', `/v1/shops/category/${categoryId}?lang=${Cookies.get('lang')}`, params ,{});
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
      const response = await callApi('get', `v1/shops/${restaurantId}/group-by-category?lang=${Cookies.get('lang')}`, {});
      return response;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);
