import { createSlice } from '@reduxjs/toolkit';
import { getOrder, cancelOrder } from '~/apiService/orderSevice';

const orderSlice = createSlice({
  name: 'statistical',
  initialState: {
    loading: false,
    orders: null,
    error: null,
    cancelOrderLoading: false,
    idOrderCancel: null,
  },

  reducers: {
    deleteOrder: (state, action) => {
      state.idOrderCancel = action.payload;
      // console.log(action);
    },
  },

  extraReducers: (builder) => {
    builder

      //cancel order
      .addCase(cancelOrder.pending, (state) => {
        state.cancelOrderLoading = true;
        state.error = null;
        state.orders = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.cancelOrderLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.cancelOrderLoading = false;
        state.orders = null;
        state.error = action.error.message;
      })

      //get order
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orders = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        // console.log(action.payload);
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
export const { deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
