import { createSlice } from '@reduxjs/toolkit';
import { loginWithGoogle } from '~/apiService/loginWithGoogleService';

const loginWithGoogleSlice = createSlice({
  name: 'loginWithGoogle',
  initialState: {
    loading: false,
    user: null,
    error: null,
    isLogin: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
        state.isLogin = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.data;
        state.error = null;
        state.isLogin = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
        state.isLogin = null;
      });
  },
});

export default loginWithGoogleSlice.reducer;
