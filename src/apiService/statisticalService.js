import { createAsyncThunk } from '@reduxjs/toolkit';
import hostname from '~/utils/http';
import { callApi } from './apiUtils';

export const statistical = createAsyncThunk('statistical', async (_, { rejectWithValue }) => {
  try {
    const response = await callApi('get', `${hostname}health-check`, null, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
