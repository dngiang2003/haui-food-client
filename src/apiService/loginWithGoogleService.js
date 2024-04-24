import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginWithGoogle = createAsyncThunk('loginWithGoogle', async (response) => {
  try {
    const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
      },
    });
    return { status: res.status, access_token: response.access_token, data: res.data };
  } catch (err) {
    throw err.response !== null ? new Error(err) : new Error('Đã xảy ra lỗi không mong đợi');
  }
});
