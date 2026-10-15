'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { Category } from '@/types';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get<Category[]>(API_ENDPOINTS.CATEGORIES);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
