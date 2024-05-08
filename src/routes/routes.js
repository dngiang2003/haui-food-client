import config from '~/config';

import { AuthLayout, NotFoundLayout, CheckoutLayout } from '~/Layouts';

import Home from '~/pages/Home';
import Restaurants from '~/pages/Restaurants';
import Restaurant from '../pages/Restaurant/Restaurant';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import ForgotPassword from '~/pages/ForgotPassword';
import VerifyOTP from '~/pages/VerifyOTP';
import ResetPassword from '~/pages/ResetPassword';
import AboutHaUIFood from '~/pages/AboutHaUIFood';
import AboutDevelopmentTeam from '~/pages/AboutDevelopmentTeam';
import CheckOut from '~/pages/CheckOut';
import NotFound from '~/pages/NotFound';
import Profile from '../pages/Profile';
import Forbidden from '~/pages/Forbidden';
import ServerError from '~/pages/ServerError';
import LoginWith2FA from '~/pages/LoginWith2FA/LoginWith2FA';
import ForgotPasswordOTP from '~/pages/ForgotPasswordOTP';
import RestaurantDetail from '~/pages/RestaurantDetail';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  {
    path: config.routes.category,
    component: Restaurants,
  },
  {
    path: config.routes.restaurants,
    component: Restaurants,
  },
  {
    path: config.routes.restaurant,
    component: RestaurantDetail,
  },

  { path: config.routes.forgotPassword, component: ForgotPassword, layout: AuthLayout },
  { path: config.routes.verifyOTP, component: VerifyOTP, layout: AuthLayout },
  { path: config.routes.resetPassword, component: ResetPassword, layout: AuthLayout },
  { path: config.routes.aboutHaUIFood, component: AboutHaUIFood },
  { path: config.routes.aboutDevelopmentTeam, component: AboutDevelopmentTeam },
  { path: config.routes.notFound, component: NotFound, layout: NotFoundLayout },
  { path: config.routes.forbidden, component: Forbidden, layout: NotFoundLayout },
  { path: config.routes.internalServer, component: ServerError, layout: NotFoundLayout },
  { path: config.routes.login, component: SignIn, layout: AuthLayout },
  { path: config.routes.signup, component: SignUp, layout: AuthLayout },
  // { path: config.routes.profile, component: Profile },
  // { path: config.routes.checkout, component: CheckOut, layout: CheckoutLayout },
  { path: config.routes.loginWith2Fa, component: LoginWith2FA, layout: AuthLayout },
  { path: config.routes.forgotPasswordOTP, component: ForgotPasswordOTP, layout: AuthLayout },
];

const privateRoutes = [
  { path: config.routes.profile, component: Profile },
  { path: config.routes.checkout, component: CheckOut, layout: CheckoutLayout },
];

export { publicRoutes, privateRoutes };
