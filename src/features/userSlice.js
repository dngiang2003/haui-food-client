import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: null,
    error: null,
    isUpdate: false,
  },

  reducers: {},
  // extraReducers(builder) {
  //   builder
     

     
  // },
});
// export const { setCategoryClicked } = categorySlice.actions;
export default userSlice.reducer;
