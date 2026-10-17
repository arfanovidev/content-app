'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  provider?: 'google' | 'linkedin' | 'facebook' | 'email';
}

interface AuthState {
  user: User | null;
  token: string | null;
  signupModalOpen: boolean;
  isAuthenticated: () => boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  openSignup: () => void;
  closeSignup: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      signupModalOpen: false,
      isAuthenticated: () => !!get().token,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      openSignup: () => set({ signupModalOpen: true }),
      closeSignup: () => set({ signupModalOpen: false }),
    }),
    {
      name: 'auth-store-v2',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);