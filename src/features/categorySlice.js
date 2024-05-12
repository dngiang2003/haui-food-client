import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '~/apiService/categoryService';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    data: {},
    listCategories: [],
    loading: null,
    error: null,
  },

  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;

        state.listCategories = [...state.listCategories, ...action.payload.categories];
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setCategoryClicked } = categorySlice.actions;
export default categorySlice.reducer;
