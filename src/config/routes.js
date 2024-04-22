const routes = {
  home: '/',
  // category: 'category/:category',
  category: 'cuisines/:category',
  restaurants: '/restaurants',
  restaurant: '/restaurant/:restaurant',
  login: '/auth/login',
  signup: '/auth/signup',
  forgotPassword: '/auth/forgot-password',
  verifyOTP: '/auth/verify-otp',
  loginWith2Fa: 'auth/login-with-2fa',
  resetPassword: '/auth/reset-password',
  aboutHaUIFood: '/about/haui-food',
  aboutDevelopmentTeam: '/about/development-team',
  profile: '/auth/profile',
  checkout: '/checkout',
  forbidden: '/forbidden',
  internalServer: '/server-error',
  notFound: '*',
};

export default routes;
