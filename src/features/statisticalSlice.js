import { createSlice } from '@reduxjs/toolkit';
import { statistical } from '~/apiService/statisticalService';

const statisticalSlice = createSlice({
  name: 'statistical',
  initialState: {
    loading: false,
    statistical: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(statistical.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.statistical = null;
      })
      .addCase(statistical.fulfilled, (state, action) => {
        state.loading = false;
        state.statistical = action.payload;
        state.error = null;
      })
      .addCase(statistical.rejected, (state, action) => {
        state.loading = false;
        state.statistical = null;
        state.error = action.error.message;
      });
  },
});

export default statisticalSlice.reducer;
