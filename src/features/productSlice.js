import { createSlice } from '@reduxjs/toolkit';
import { searchProduct } from '~/apiService/productService';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: null,
    loading: null,
    error: null,
    length: 0,
    data: null,
  },

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.error = action.error.message;
      });
  },
});
// export const { setCategoryClicked } = categorySlice.actions;
export default productSlice.reducer;
