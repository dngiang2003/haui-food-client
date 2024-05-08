import { createSlice } from '@reduxjs/toolkit';
import { getRestaurants, getRestaurantsForListSlider } from '~/apiService/restaurantService';

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    restaurants: null,
    loading: null,
    error: null,
    length: 0,
    listSlider: [],
  },

  reducers: {},
  extraReducers(builder) {
    builder

      // get restaurants for listSlider
      .addCase(getRestaurantsForListSlider.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.listSlider = null;
      })
      .addCase(getRestaurantsForListSlider.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.listSlider = action.payload.data.shops;
        state.error = null;
      })
      .addCase(getRestaurantsForListSlider.rejected, (state, action) => {
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

export default restaurantSlice.reducer;
