import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { publicRoutes, privateRoutes } from '~/routes';
import DefaultLayout from './Layouts';
import axiosInstance from './apiService/axiosInstance';
import ProtectedRoute from './routes/ProtectedRoute';
import config from './config';

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
        if (response.url.includes('login') && response.code === 202) {
          sessionStorage.setItem('token2FA', JSON.stringify(response.data.twoFaToken));
          navigate('auth/login-with-2fa');
        }
        return response;
      },
      (error) => {
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

  // Thêm sự kiện vào devtools
  useEffect(() => {
    const detectDevTools = (event) => {
      // if (event.ctrlKey && event.shiftKey && event.key === 'I') {
      console.log('%cĐịnh phá web của các anh à 😒!', 'color: red; font-size: 20px; cursor: pointer;');
      console.log('%cCần gì liên hệ các anh 😉', 'color: blue; font-size: 14px; cursor: pointer;');
      console.log('Anh Lộc đẹp trai:', 'https://www.facebook.com/loc.trinhgia.7');
      console.log('Anh Giang:', 'https://www.facebook.com/dngiang2003');
      console.log('Anh Công:', 'https://www.facebook.com/Nhu.Cong1123');
      console.log('Anh Nghĩa:', 'https://www.facebook.com/profile.php?id=100009552092377');
      console.log('Anh Dũng:', 'https://www.facebook.com/profile.php?id=100012048721594');
      // }
    };
    detectDevTools();
  }, []);

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
      <ToastContainer style={{ zIndex: '9999999999' }} />
    </div>
  );
}

export default App;
