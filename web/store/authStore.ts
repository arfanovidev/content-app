'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'user';

interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  role?: UserRole;
  provider?: 'google' | 'linkedin' | 'facebook' | 'email';
}

interface AuthState {
  user: User | null;
  token: string | null;
  signupModalOpen: boolean;
  _hasHydrated: boolean;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  openSignup: () => void;
  closeSignup: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      signupModalOpen: false,
      _hasHydrated: false,
      isAuthenticated: () => !!get().token,
      isAdmin: () => get().user?.role === 'admin',
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      openSignup: () => set({ signupModalOpen: true }),
      closeSignup: () => set({ signupModalOpen: false }),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'auth-store-v2',
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);