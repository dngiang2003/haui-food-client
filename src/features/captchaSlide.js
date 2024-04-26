import { createSlice } from '@reduxjs/toolkit';
import { captcha } from '~/apiService/captchaService';

const captchaSlice = createSlice({
  name: 'captcha',
  initialState: {
    loading: false,
    captcha: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(captcha.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.captcha = null;
      })
      .addCase(captcha.fulfilled, (state, action) => {
        state.loading = false;
        state.captcha = action.payload;
        state.error = null;
      })
      .addCase(captcha.rejected, (state, action) => {
        state.loading = false;
        state.captcha = null;
        state.error = action.error.message;
      });
  },
});

export default captchaSlice.reducer;
