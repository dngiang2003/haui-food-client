import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';
import Cookies from 'js-cookie';

export const resetPassword = createAsyncThunk('auth/reset-password', async (data, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('post', `/v1/auth/reset-password`, null, data, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const verifyOtpForgotPassword = createAsyncThunk(
  'auth/verify-otp-forgot-password',
  async (data, { rejectWithValue }) => {
    try {
      const customHeaders = {
        'accept-language': `${Cookies.get('lang')}`,
      };
      const response = await callApi('post', `/v1/auth/verify-otp-forgot-password`, null, data, customHeaders);
      if (response.code === 200) {
      }
      return response;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  },
);

export const forgotPassword = createAsyncThunk('auth/forgot-password', async (data, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('post', `/v1/auth/forgot-password`, null, data, customHeaders);
    if (response.code === 200) {
    }
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const loginUser = createAsyncThunk('auth/login', async (userCredentials, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const res = await callApi('POST', `/v1/auth/login`, null, userCredentials, customHeaders);
    if (res.code === 200) {
      localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const LoginWith2FA = createAsyncThunk('auth/login-with-2FA', async (data, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('post', `/v1/auth/login-with-2fa`, null, data, customHeaders);
    if (response.code === 200) {
      localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const registerUser = createAsyncThunk('auth/signup', async (userCredentials, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const res = await callApi('post', `/v1/auth/register`, null, userCredentials, customHeaders);
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('get', `/v1/auth/me`, null, {}, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const updateMe = createAsyncThunk('auth/updateMe', async ({ userData, avatar }, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'Content-Type': 'multipart/form-data',
      'accept-language': `${Cookies.get('lang')}`,
      // Các header khác nếu cần
    };
    //  Tạo một đối tượng FormData
    const formData = new FormData();

    // Thêm dữ liệu người dùng vào formData
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    // Thêm ảnh vào formData
    if (avatar) {
      formData.append('avatar', avatar);
    }

    const response = await callApi('put', `/v1/auth/me}`, null, formData, customHeaders);

    if (response.code === 200) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const changePassword = createAsyncThunk('auth/change-password', async (userData, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('post', `/v1/auth/change-password`, null, userData, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const getSecretKey = createAsyncThunk('auth/getSecretKey', async (_, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('post', `/v1/auth/generate-2fa-secret`, null, {}, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const toggle2FA = createAsyncThunk('auth/toggle2FA', async (code, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('post', `v1/auth/toggle-2fa`, null, code, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const updateSecretKey = createAsyncThunk('auth/updateSecretKey', async (data, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'accept-language': `${Cookies.get('lang')}`,
    };
    const response = await callApi('post', `v1/auth/change-2fa-secret`, null, data, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const clearError = createAsyncThunk('auth/clearError', async () => {});
