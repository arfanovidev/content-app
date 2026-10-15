'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';

export function UserKeyInit() {
  const ensureUserKey = useUserStore((s) => s.ensureUserKey);

  useEffect(() => {
    ensureUserKey();
  }, [ensureUserKey]);

  return null;
}
