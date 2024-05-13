import { createSlice } from '@reduxjs/toolkit';
import { getOrder } from '~/apiService/orderSevice';

const orderSlice = createSlice({
  name: 'statistical',
  initialState: {
    loading: false,
    orders: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orders = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.orders = null;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
