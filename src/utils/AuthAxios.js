// src/utils/axiosWithAuth.js
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'https://isoenrollment.onrender.com/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Cookies.get('refresh_token')
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          'https://isoenrollment.onrender.com/api/token/refresh/',
          { refresh: Cookies.get('refresh_token') }
        );

        const newAccessToken = refreshResponse.data.access;
        Cookies.set('access_token', newAccessToken, { expires: 1 });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
