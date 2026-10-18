import axios from 'axios';
import { API_BASE_URL } from './constants';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000, // 90s — handles Render free-tier cold start
});

// Request interceptor (add auth token)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      // Zustand persist key from store/authStore.ts is `auth-store-v2`
      const authData =
        localStorage.getItem('auth-store-v2') ||
        localStorage.getItem('auth-store') ||
        localStorage.getItem('authStore') ||
        localStorage.getItem('auth-storage');

      if (authData) {
        try {
          const parsed = JSON.parse(authData);
          // Zustand persist wraps state under `.state`
          const token =
            parsed?.state?.token ||
            parsed?.token ||
            parsed?.state?.accessToken;
          if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch {
          // ignore malformed JSON
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

    // Timeout (Render cold start)
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return Promise.reject({
        status: 0,
        message:
          'Server is waking up (first request can take 30-60s on free tier). Please try again.',
        error: 'Timeout',
      });
    }

    return Promise.reject({
      status: 0,
      message: 'Network error — please check your connection and try again.',
      error: 'Network error',
    });
  },
);

export default api;