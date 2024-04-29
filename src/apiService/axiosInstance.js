import axios from 'axios';
import { addOrUpdateFieldInLocalStorage, getLocalStorageItem } from '~/utils/localStorage';

const axiosInstance = axios.create({
  baseURL: 'https://api.hauifood.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để tự động gắn token vào header
axiosInstance.interceptors.request.use(async (config) => {
  const token = getLocalStorageItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    // console.log(response);
    return { ...response.data, config: response.config };
  },

  async function (error) {
    // const originalRequest = error.config;
    // Kiểm tra nếu mã trạng thái là 401 và không phải là lỗi từ phía request refresh token
    console.log(error.response);
    // if (error.response.data.code === 401 && error.response.data.message === 'jwt expired' && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   try {
    //     // Gọi endpoint refresh token ở đây và nhận lại access token mới
    //     const refreshToken = getLocalStorageItem('refreshToken');
    //     const response = await axiosInstance.post('v1/auth/refresh-tokens', { refreshToken: refreshToken });
    //     const newAccessToken = response.data.accessToken;
    //     // Lưu trữ access token mới vào local storage hoặc nơi phù hợp khác
    //     addOrUpdateFieldInLocalStorage(null, 'accessToken', newAccessToken);
    //     // Cập nhật access token mới vào header của request ban đầu
    //     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
    //     // Thử gọi lại request ban đầu với access token mới
    //     return axiosInstance(originalRequest);
    //   } catch (refreshError) {
    //     // Xử lý lỗi khi không thể refresh token (ví dụ: đăng xuất người dùng)

    //     localStorage.removeItem('user');
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('refreshToken');

    //     console.log(refreshError);
    //     return Promise.reject(refreshError);
    //   }
    // }

    if (error.response) {
      console.log(error);
      const { code, message } = error.response.data;
      return Promise.reject({ success: false, message: message, code: code,config: error.config });
    } else {
      // Nếu không có phản hồi từ máy chủ
      // Trả về một object có cấu trúc tùy chỉnh
      return Promise.reject({ success: false, message: 'Network error', code: 0 });
    }
  },
);

export default axiosInstance;
