import { createSlice } from '@reduxjs/toolkit';
import { addProductToCart } from '~/apiService/cartService';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: null,
    error: null,
  },

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
