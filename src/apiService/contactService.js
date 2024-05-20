import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { callApi } from './apiUtils';

export const contactUs = createAsyncThunk('contacts', async (communications, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const res = await callApi('post', `/v1/contacts`, null, communications, customHeaders);
    return res;
  } catch (err) {
    return rejectWithValue({ ...err });
  }
});
