'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useAuthStore } from '@/store/authStore';

export interface CompletedRecord {
  id: string;
  contentId: string;
  userKey: string;
  completedAt: string;
  readDuration?: number;
}

export function useCompleted() {
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: ['completed', userId],  // ← user-specific cache
    queryFn: async () => {
      const res = await api.get<CompletedRecord[]>(API_ENDPOINTS.COMPLETED);
      return res.data;
    },
    enabled: !!isAuth,  // ← only fetch if logged in
    staleTime: 30 * 1000,
  });
}