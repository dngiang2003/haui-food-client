import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import Cookies from 'js-cookie';

export const displayProductInCart = createAsyncThunk('displayProductInCart', async (_, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('get', `v1/carts/me`, null, null, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const addProductToCart = createAsyncThunk('addProductToCart', async (data, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('post', `v1/carts/add-product`, null, data, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const removeProductToCart = createAsyncThunk('removeProductToCart', async (data, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('put', `v1/carts/remove-product`, null, data, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
