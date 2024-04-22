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
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    // Xử lý lỗi và tùy chỉnh phản hồi ở đây
    if (error) {
      // Nếu có phản hồi từ máy chủ
      console.log(error);
      return Promise.reject({ ...error });
    }
  }
};

// export const callApi = async (method, url, params = null, data = null) => {
//   try {
//     const response = await axiosInstance({
//       method: method,
//       url: url,
//       params: params,
//       data: data,
//     });
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(error);
//     // Xử lý lỗi và tùy chỉnh phản hồi ở đây
//     if (error) {
//       // Nếu có phản hồi từ máy chủ
//       console.log(error);
//       return Promise.reject({ ...error });
//     }
//   }
// };
