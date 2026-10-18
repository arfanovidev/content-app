'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const hydrated = useAuthStore((s) => s._hasHydrated);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!hydrated) return;
    if (isLoginPage) return;

    if (!isAuth) {
      router.replace('/admin/login');
      return;
    }

    if (user?.role !== 'admin') {
      router.replace('/');
    }
  }, [hydrated, isAuth, user, router, isLoginPage]);

  if (isLoginPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  if (!hydrated || !isAuth || user?.role !== 'admin') {
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