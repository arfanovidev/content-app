'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useUserStore } from '@/store/userStore';

export interface CompletedRecord {
  id: string;
  contentId: string;
  userKey: string;
  completedAt: string;
  readDuration?: number;
}

export function useCompleted() {
  const userKey = useUserStore((s) => s.userKey);

  return useQuery({
    queryKey: ['completed', userKey],
    queryFn: async () => {
      if (!userKey) return [];
      const res = await api.get<CompletedRecord[]>(
        `${API_ENDPOINTS.COMPLETED}?userKey=${userKey}`,
      );
      return res.data;
    },
    enabled: !!userKey,
    staleTime: 30 * 1000,
  });
}