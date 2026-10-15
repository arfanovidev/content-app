'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { Content } from '@/types';

export function useContent(slug: string) {
  return useQuery({
    queryKey: ['content', slug],
    queryFn: async () => {
      const res = await api.get<Content>(
        API_ENDPOINTS.CONTENT_BY_SLUG(slug),
      );
      return res.data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
