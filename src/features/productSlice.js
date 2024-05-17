import { createSlice } from '@reduxjs/toolkit';
import { searchProduct } from '~/apiService/productService';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    shops: [],
    loading: null,
    error: null,
    length: 0,
    data: null,
    isOpenQuantityDrawer: false,
    updatingQuantityProduct: null,
  },

  reducers: {
    openQuantityDrawer: (state, action) => {
      state.isOpenQuantityDrawer = true;
      state.updatingQuantityProduct = action.payload;
    },
    closeQuantityDrawer: (state) => {
      state.isOpenQuantityDrawer = false;
      state.updatingQuantityProduct = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.products = [];
        state.shops = [];
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.products = action.payload.data.products;
        state.shops = action.payload.data.shops;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message;
        state.products = [];
        state.shops = [];
      });
  },
});
// export const { setCategoryClicked } = categorySlice.actions;
export const { openQuantityDrawer, closeQuantityDrawer } = productSlice.actions;
export default productSlice.reducer;
