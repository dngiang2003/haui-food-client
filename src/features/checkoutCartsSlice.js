import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedShops: [],
};

const checkoutCartsReducer = createSlice({
  name: 'checkoutCarts',
  initialState,
  reducers: {
    saveSelectedShops: (state, action) => {
      state.selectedShops = action.payload;
    },
  },
});

export const { saveSelectedShops } = checkoutCartsReducer.actions;
export default checkoutCartsReducer.reducer;
