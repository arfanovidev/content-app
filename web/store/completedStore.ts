'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompletedItem {
  contentId: string;
  completedAt: string;
}

interface CompletedState {
  completed: CompletedItem[];
  isCompleted: (contentId: string) => boolean;
  markCompleted: (contentId: string) => void;
  removeCompleted: (contentId: string) => void;
}

export const useCompletedStore = create<CompletedState>()(
  persist(
    (set, get) => ({
      completed: [],
      isCompleted: (contentId) =>
        get().completed.some((c) => c.contentId === contentId),
      markCompleted: (contentId) =>
        set((state) => {
          if (state.completed.some((c) => c.contentId === contentId)) {
            return state;
          }
          return {
            completed: [
              ...state.completed,
              { contentId, completedAt: new Date().toISOString() },
            ],
          };
        }),
      removeCompleted: (contentId) =>
        set((state) => ({
          completed: state.completed.filter(
            (c) => c.contentId !== contentId,
          ),
        })),
    }),
    { name: 'completed-store' },
  ),
);