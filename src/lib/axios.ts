// lib/axios.ts
import axios from 'axios';
import { notifications } from '@mantine/notifications';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status !== 401) {
      notifications.show({
        color: 'red',
        title: error.name,
        message: error.message,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
