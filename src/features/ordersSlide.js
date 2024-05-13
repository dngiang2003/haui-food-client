import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '~/apiService/ordersService';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: {},
    loading: null,
    error: null,
    isOrder: false,
  },

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.error = null;
        state.isOrder = true;
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
