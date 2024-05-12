import axiosInstance from './axiosInstance';

export const callApi = async (method, url, params = null, data = null, customHeaders = {}) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      params: params,
      data: data,
      headers: { ...axiosInstance.defaults.headers, ...customHeaders },
    });
    return response;
  } catch (error) {
    // Xử lý lỗi và tùy chỉnh phản hồi ở đây
    if (error) {
      // Nếu có phản hồi từ máy chủ
      return Promise.reject({ ...error });
    }
  }
};

