import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/features/authSlice.js';
import categoryReducer from '../features/categorySlice';
import userReducer from '../features/userSlice';
import captchaReducer from '../features/captchaSlide';
import restaurantReducer from '~/features/restaurantSlice';
import productReducer from '~/features/productSlice';
export default configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
    captcha: captchaReducer,
    restaurant: restaurantReducer,
    product: productReducer,
  },
});
