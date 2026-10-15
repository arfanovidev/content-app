'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { API_ENDPOINTS, ROUTES } from '@/lib/constants';
import { useAuthStore } from '@/store/authStore';
import type { LoginResponse } from '@/types';

interface LoginPayload {
  username: string;
  password: string;
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post<LoginResponse>(
        API_ENDPOINTS.LOGIN,
        payload,
      );
      return res.data;
    },
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user);
      queryClient.clear();
      router.push(ROUTES.ADMIN);
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
    router.push(ROUTES.ADMIN_LOGIN);
  };
}