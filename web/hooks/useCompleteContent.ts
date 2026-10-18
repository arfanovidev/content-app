'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { useCompletedStore } from '@/store/completedStore';

interface CompletePayload {
  contentId: string;
  readDuration: number;
}

export function useCompleteContent() {
  const markCompleted = useCompletedStore((s) => s.markCompleted);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentId, readDuration }: CompletePayload) => {
      // No userKey — JWT identifies user
      const res = await api.post(API_ENDPOINTS.COMPLETED, {
        contentId,
        readDuration,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      markCompleted(variables.contentId);
      queryClient.invalidateQueries({ queryKey: ['completed'], exact: false });
    },
  });
}