import { createSlice } from '@reduxjs/toolkit';
import { addProductToCart, displayProductInCart, removeProductToCart } from '~/apiService/cartService';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    loading: null,
    error: null,
    isAddProduct: false,
    isDeleteProduct: false,
  },

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAddProduct = false;
        state.isDeleteProduct = false;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAddProduct = true;
        state.isDeleteProduct = false;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAddProduct = false;
        state.isDeleteProduct = false;
      })
      .addCase(displayProductInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isDeleteProduct = false;
        state.isAddProduct = false;
      })
      .addCase(displayProductInCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isDeleteProduct = false;
        state.isAddProduct = false;
      })
      .addCase(displayProductInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isDeleteProduct = false;
        state.isAddProduct = false;
      })
      .addCase(removeProductToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isDeleteProduct = false;
        state.isAddProduct = false;
      })
      .addCase(removeProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isDeleteProduct = true;
        state.isAddProduct = false;
      })
      .addCase(removeProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isDeleteProduct = false;
        state.isAddProduct = false;
      });
  },
});

export default cartSlice.reducer;
