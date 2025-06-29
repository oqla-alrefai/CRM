// src/api/authAxios.js
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "../utils/authHelpers";

const authAxios = axios.create();

authAxios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to refresh access token on 401
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return authAxios(originalRequest); // Retry original request
      } catch (refreshError) {
        // If refresh also fails, let it bubble up
      }
    }
    return Promise.reject(error);
  }
);

export default authAxios;
