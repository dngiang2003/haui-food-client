import { createAsyncThunk } from '@reduxjs/toolkit';
import hostname from '~/utils/http';
import axios from 'axios';
import { callApi } from './apiUtils';

export const loginUser = createAsyncThunk('auth/login', async (userCredentials, { rejectWithValue }) => {
  try {
    const res = await callApi('POST', '/v1/auth/login', null, userCredentials);
    console.log(res);
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
    const response = await callApi('post', '/v1/auth/login-with-2fa', null, data);
    if (response.code === 200) {
      console.log(response);
      localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const registerUser = createAsyncThunk('auth/signup', async (userCredentials) => {
  try {
    const req = await axios.post(`${hostname}/v1/auth/register`, userCredentials);
    const res = await req.data.data;

    return res;
  } catch (error) {
    throw error.response !== null ? new Error(error.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');
  }
});

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try {
    const response = await callApi('get', '/v1/auth/me', null, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const updateMe = createAsyncThunk('auth/updateMe', async ({ userData, avatar }, { rejectWithValue }) => {
  try {
    const customHeaders = {
      'Content-Type': 'multipart/form-data',
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

    const response = await callApi('put', '/v1/auth/me', null, formData, customHeaders);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const changePassword = createAsyncThunk('auth/change-password', async (userData, { rejectWithValue }) => {
  try {
    const response = await callApi('post', '/v1/auth/change-password', null, userData);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const getSecretKey = createAsyncThunk('auth/getSecretKey', async (_, { rejectWithValue }) => {
  try {
    const response = await callApi('post', '/v1/auth/generate-2fa-secret', null, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const toggle2FA = createAsyncThunk('auth/toggle2FA', async (code, { rejectWithValue }) => {
  try {
    const response = await callApi('post', 'v1/auth/toggle-2fa', null, code);
    console.log(response);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const updateSecretKey = createAsyncThunk('auth/updateSecretKey', async (data, { rejectWithValue }) => {
  try {
    console.log(data);
    const response = await callApi('post', 'v1/auth/change-2fa-secret', null, data);
    console.log(response);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const clearError = createAsyncThunk('auth/clearError', async () => {});
