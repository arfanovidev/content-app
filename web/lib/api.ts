import axios from 'axios';
import { API_BASE_URL } from './constants';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor (add auth token)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const authData = localStorage.getItem('auth-store');
      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          const token = parsed?.state?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch {
          // ignore
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor (normalize errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject({
        status,
        message: data?.message || 'Request failed',
        error: data?.error || 'Unknown error',
      });
    }
    return Promise.reject({
      status: 0,
      message: 'Network error',
      error: 'Network error',
    });
  },
);

export default api;
