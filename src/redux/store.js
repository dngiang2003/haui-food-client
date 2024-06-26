import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/features/authSlice.js';
import categoryReducer from '../features/categorySlice';
import userReducer from '../features/userSlice';
import captchaReducer from '../features/captchaSlide';
import restaurantReducer from '~/features/restaurantSlice';
import productReducer from '~/features/productSlice';
import cartReducer from '~/features/cartSlice';
import orderReducer from '~/features/orderSlice';
import checkoutCarts from '~/features/checkoutCartsSlice';
import ordersSlide from '~/features/ordersSlide';
import paymentSlice from '~/features/paymentSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
    captcha: captchaReducer,
    restaurant: restaurantReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    checkoutCarts: checkoutCarts,
    orders: ordersSlide,
    payment: paymentSlice,
  },
});
