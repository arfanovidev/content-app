'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ROUTES } from '@/lib/constants';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((s) => s.token);

  const isLoginPage = pathname === ROUTES.ADMIN_LOGIN;

  useEffect(() => {
    if (!token && !isLoginPage) {
      router.replace(ROUTES.ADMIN_LOGIN);
    }
  }, [token, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!token) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 sm:flex-row">
        <AdminSidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}