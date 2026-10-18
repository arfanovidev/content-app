'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

export function UserKeyInit() {
  const ensureUserKey = useUserStore((s) => s.ensureUserKey);
  const isAuth = useAuthStore((s) => s.isAuthenticated());

  useEffect(() => {
    // Only generate anonymous userKey for non-authenticated users
    // Authenticated users use JWT userId for all tracking
    if (!isAuth) {
      ensureUserKey();
    }
  }, [isAuth, ensureUserKey]);

  return null;
}