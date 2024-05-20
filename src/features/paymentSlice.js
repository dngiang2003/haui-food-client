import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payment: {},
};

const paymentReducer = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    savePayment: (state, action) => {
      state.payment = action.payload;
    },
  },
});

export const { savePayment } = paymentReducer.actions;
export default paymentReducer.reducer;
