import { createSlice } from '@reduxjs/toolkit';
import { contactUs } from '~/apiService/contactService';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    loading: false,
    contacts: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(contactUs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.contacts = null;
      })
      .addCase(contactUs.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
        state.error = null;
      })
      .addCase(contactUs.rejected, (state, action) => {
        state.loading = false;
        state.contacts = null;
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
