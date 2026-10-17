'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const hydrated = useAuthStore((s) => s._hasHydrated);

  useEffect(() => {
    if (!hydrated) return;

    // Not logged in → redirect to signup/home
    if (!isAuth) {
      router.replace('/');
      return;
    }

    // Logged in but not admin → redirect to user dashboard
    if (user?.username !== 'admin') {
      router.replace('/user');
    }
  }, [hydrated, isAuth, user, router]);

  if (!hydrated || !isAuth || user?.username !== 'admin') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-6">
      {children}
    </div>
  );
}