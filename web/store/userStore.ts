import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

interface UserState {
  userKey: string;
  ensureUserKey: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userKey: '',
      ensureUserKey: () => {
        if (!get().userKey) {
          set({ userKey: nanoid(16) });
        }
      },
    }),
    { name: 'user-store' },
  ),
);
