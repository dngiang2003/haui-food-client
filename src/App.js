import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { publicRoutes, privateRoutes } from '~/routes';
import DefaultLayout from './Layouts';
import axiosInstance from './apiService/axiosInstance';
import ProtectedRoute from './routes/ProtectedRoute';
import config from './config';
import { addOrUpdateFieldInLocalStorage, getLocalStorageItem } from './utils/localStorage';

function App() {
  return (
    <Router>
      <AppBody />
    </Router>
  );
}

function AppBody() {
  const navigate = useNavigate();

  useEffect(() => {
    // Tạo interceptor trong useEffect để có thể sử dụng useNavigate
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        console.log(response);
        if (response.config.url.includes('login') && response.code === 202) {
          // console.log(response);
          sessionStorage.setItem('token2FA', JSON.stringify(response.data.twoFaToken));
          navigate('auth/login-with-2fa');
        }
        if (response.code === 500) {
          navigate(config.routes.internalServer);
        }

        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        // Kiểm tra nếu mã trạng thái là 401 và không phải là lỗi từ phía request refresh token

        if (error.code === 401 && error.message === 'jwt expired' && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            // Gọi endpoint refresh token ở đây và nhận lại access token mới
            const refreshToken = getLocalStorageItem('refreshToken');
            const response = await axiosInstance.post('v1/auth/refresh-tokens', { refreshToken: refreshToken });
            const newAccessToken = response.data.accessToken;
            // Lưu trữ access token mới vào local storage hoặc nơi phù hợp khác
            addOrUpdateFieldInLocalStorage(null, 'accessToken', newAccessToken);
            // Cập nhật access token mới vào header của request ban đầu
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            // Thử gọi lại request ban đầu với access token mới
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            // Xử lý lỗi khi không thể refresh token (ví dụ: đăng xuất người dùng)
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            navigate(config.routes.login);
            return Promise.reject(refreshError);
          }
        }
        if (error.code === 500) {
          navigate(config.routes.internalServer);
        }
        return Promise.reject(error); // Chuyển tiếp lỗi để xử lý ở các component khác
      },
    );

    // Hủy bỏ interceptor khi component unmount
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [navigate]); // Ensure useEffect runs again if navigate changes

  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          const { component: Page, layout: Layout = DefaultLayout } = route;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {privateRoutes.map((route, index) => {
          const { component: Page, layout: Layout = DefaultLayout } = route;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Page />
                  </Layout>
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
