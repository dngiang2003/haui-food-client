import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import hostname from '~/utils/http';

export const getCategories = createAsyncThunk('category/getCategories', async ({ limit, page }) => {
  try {
    const req = await axios.get(`${hostname}/v1/categories?limit=${limit}&page=${page}`);
    const res = req.data.data;
    return res;
  } catch (error) {
    throw error.response !== null ? new Error(error.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');
  }
});
