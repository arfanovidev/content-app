'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { LoginForm } from '@/components/admin/LoginForm';
import { useMessages } from '@/hooks/useMessages';
import { ROUTES } from '@/lib/constants';

export default function AdminLoginPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const t = useMessages();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTES.ADMIN);
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <BookOpen className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            {t.admin.loginTitle}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.admin.loginSubtitle}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <LoginForm />
        </div>

        <div className="text-center">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            {t.admin.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}