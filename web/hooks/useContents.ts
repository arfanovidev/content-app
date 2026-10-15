'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { Content } from '@/types';

export function useContents(categoryId?: string) {
  return useQuery({
    queryKey: ['contents', categoryId ?? 'all'],
    queryFn: async () => {
      const url = categoryId
        ? `${API_ENDPOINTS.CONTENTS}?category=${categoryId}`
        : API_ENDPOINTS.CONTENTS;
      const res = await api.get<Content[]>(url);
      return res.data;
    },
    staleTime: 60 * 1000,
  });
}
