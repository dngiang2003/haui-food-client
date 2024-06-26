import { createSlice } from '@reduxjs/toolkit';
import {
  getRestaurants,
  getRestaurantsForListSlider,
  getRestaurantDetail,
  getRestaurantsByCategory,
} from '~/apiService/restaurantService';

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    restaurants: null,
    loading: null,
    loadingSlider: null,
    error: null,
    length: 0,
    listSlider: [],
    restaurantDetail: null,
  },

  reducers: {},
  extraReducers(builder) {
    builder

      //get restaurant detail
      .addCase(getRestaurantDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurantDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.restaurantDetail = action.payload.data.shop;
      })
      .addCase(getRestaurantDetail.rejected, (state, action) => {
        state.loading = false;
        state.restaurants = null;
        state.error = action.error.message;
      })

      // get restaurants for listSlider
      .addCase(getRestaurantsForListSlider.pending, (state) => {
        state.loadingSlider = true;
        state.error = null;
        state.listSlider = null;
      })
      .addCase(getRestaurantsForListSlider.fulfilled, (state, action) => {
        state.loadingSlider = false;
        state.listSlider = action.payload.data.shops;
        state.error = null;
      })
      .addCase(getRestaurantsForListSlider.rejected, (state, action) => {
        state.loadingSlider = false;
        state.restaurants = null;
        state.error = action.error.message;
        state.length = 0;
      })

      //getRestaurant by category
      .addCase(getRestaurantsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.restaurants = null;
        // state.length = 0;
      })
      .addCase(getRestaurantsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload.data;
        state.length = action.payload.data.totalResult;
        state.error = null;
      })
      .addCase(getRestaurantsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.restaurants = null;
        state.error = action.error.message;
        state.length = 0;
      })

      //getRestaurant
      .addCase(getRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.restaurants = null;
        // state.length = 0;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload.data;
        // state.length = action.payload.data.totalResult;
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

export default restaurantSlice.reducer;
