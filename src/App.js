import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { publicRoutes, privateRoutes } from '~/routes';
import DefaultLayout from './Layouts';
import axiosInstance from './apiService/axiosInstance';
import ProtectedRoute from './routes/ProtectedRoute';

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
    const interceptor = axiosInstance.interceptors.response.use((response) => {
      // console.log(response);
      if (response.config.url.includes('login') && response.code === 202) {
        // console.log(response);
        sessionStorage.setItem('token2FA', JSON.stringify(response.data.twoFaToken));
        navigate('auth/login-with-2fa');
      }
      return response;
    });

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
