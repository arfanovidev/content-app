'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useUserStore } from '@/store/userStore';

export interface VoteTally {
  contentId: string;
  up: number;
  down: number;
  score: number;
  userVote?: 1 | -1 | 0;
}

export function useVoteTally(contentId: string) {
  const userKey = useUserStore((s) => s.userKey);

  return useQuery({
    queryKey: ['vote', contentId, userKey],
    queryFn: async () => {
      const url = userKey
        ? `${API_ENDPOINTS.VOTES_TALLY(contentId)}?userKey=${userKey}`
        : API_ENDPOINTS.VOTES_TALLY(contentId);
      const res = await api.get<VoteTally>(url);
      return res.data;
    },
    enabled: !!contentId,
    staleTime: 30 * 1000,
  });
}

export function useCastVote() {
  const userKey = useUserStore((s) => s.userKey);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      contentId,
      value,
    }: {
      contentId: string;
      value: 1 | -1;
    }) => {
      const res = await api.post<VoteTally>(API_ENDPOINTS.VOTES, {
        contentId,
        userKey,
        value,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ['vote', variables.contentId, userKey],
        (old: VoteTally | undefined) => ({
          ...data,
          userVote: data.userVote ?? 0,
        }),
      );
    },
  });
}