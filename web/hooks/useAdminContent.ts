'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { Content, Category } from '@/types';

interface CreateContentInput {
  title: { en: string; bn: string };
  shortDescription: { en: string; bn: string };
  categoryId: string;
  tags: string[];
  coverImage: string;
  quillDelta: any;
  readTime: number;
  lang: 'en' | 'bn';
  author: string;
}

export function useCreateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateContentInput) => {
      const res = await api.post<Content>(API_ENDPOINTS.CONTENTS, input);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
}

export function useUpdateContent(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Partial<CreateContentInput>) => {
      const res = await api.put<Content>(
        API_ENDPOINTS.CONTENT_BY_ID(id),
        input,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
      queryClient.invalidateQueries({ queryKey: ['content'] });
    },
  });
}

export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(API_ENDPOINTS.CONTENT_BY_ID(id));
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contents'] });
    },
  });
}

interface CreateCategoryInput {
  name: { en: string; bn: string };
  description: { en: string; bn: string };
  icon: string;
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCategoryInput) => {
      const res = await api.post<Category>(API_ENDPOINTS.CATEGORIES, input);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(
        `${API_ENDPOINTS.CATEGORIES}/${id}`,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}