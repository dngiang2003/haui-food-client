import { createSlice } from '@reduxjs/toolkit';
import { getRestaurants } from '~/apiService/restaurantService';

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    restaurants: null,
    loading: null,
    error: null,
    length: 0,
  },

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.restaurants = null;
        // state.length = 0;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload.data;
        state.length = action.payload.data.totalResult;
        state.error = null;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.restaurants = null;
        state.error = action.error.message;
        state.length = 0;
      });
  },
});
// export const { setCategoryClicked } = categorySlice.actions;
export default restaurantSlice.reducer;
