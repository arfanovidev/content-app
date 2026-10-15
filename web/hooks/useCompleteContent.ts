'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useUserStore } from '@/store/userStore';
import { useCompletedStore } from '@/store/completedStore';

interface CompletePayload {
  contentId: string;
  readDuration: number;
}

export function useCompleteContent() {
  const userKey = useUserStore((s) => s.userKey);
  const markCompleted = useCompletedStore((s) => s.markCompleted);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentId, readDuration }: CompletePayload) => {
      const res = await api.post(API_ENDPOINTS.COMPLETED, {
        contentId,
        userKey,
        readDuration,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      markCompleted(variables.contentId);
      queryClient.invalidateQueries({ queryKey: ['completed'] });
    },
  });
}