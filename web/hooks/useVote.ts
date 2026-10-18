'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useAuthStore } from '@/store/authStore';

export interface VoteTally {
  contentId: string;
  up: number;
  down: number;
  score: number;
  userVote?: 1 | -1 | 0;
}

export function useVoteTally(contentId: string) {
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: ['vote', contentId, userId],
    queryFn: async () => {
      // JWT header identifies user — no query param needed
      const res = await api.get<VoteTally>(API_ENDPOINTS.VOTES_TALLY(contentId));
      return res.data;
    },
    enabled: !!contentId,
    staleTime: 30 * 1000,
  });
}

export function useCastVote() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: async ({
      contentId,
      value,
    }: {
      contentId: string;
      value: 1 | -1;
    }) => {
      // No userKey — JWT identifies voter
      const res = await api.post<VoteTally>(API_ENDPOINTS.VOTES, {
        contentId,
        value,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ['vote', variables.contentId, userId],
        (old: VoteTally | undefined) => ({
          ...data,
          userVote: data.userVote ?? 0,
        }),
      );
    },
  });
}