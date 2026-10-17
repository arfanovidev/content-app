'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, BookOpen, Heart, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCompleted } from '@/hooks/useCompleted';
import { CardSkeleton } from '@/components/home/CardSkeleton';

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const logout = useAuthStore((s) => s.logout);
  const hydrated = useAuthStore((s) => s._hasHydrated);
  const { data: completed, isLoading } = useCompleted();

  useEffect(() => {
    if (hydrated && !isAuth) {
      router.replace('/');
    }
  }, [hydrated, isAuth, router]);

  if (!hydrated || !user) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <CardSkeleton />
      </div>
    );
  }

  const initials = user.username.slice(0, 2).toUpperCase();
  const completedCount = completed?.length ?? 0;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Profile header */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 text-2xl font-bold text-white dark:from-zinc-200 dark:to-zinc-400 dark:text-zinc-900">
            {initials}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold tracking-tight">
              {user.username}
            </h1>
            {user.email && (
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
                <Mail className="h-3.5 w-3.5" />
                {user.email}
              </p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              Signed in with {user.provider ?? 'email'}
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            Completed
          </div>
          <p className="mt-2 text-2xl font-bold">{completedCount}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Heart className="h-3.5 w-3.5" />
            Favorites
          </div>
          <p className="mt-2 text-2xl font-bold">{completedCount}</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            Member since
          </div>
          <p className="mt-2 text-2xl font-bold">2026</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-6 rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold">Quick actions</h2>
        </div>
        <div className="divide-y divide-border">
          <Link
            href="/favorites"
            className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-accent"
          >
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              My Favorites
            </span>
            <span className="text-muted-foreground">→</span>
          </Link>
          <Link
            href="/"
            className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-accent"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              Browse stories
            </span>
            <span className="text-muted-foreground">→</span>
          </Link>
          {user.username === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                Admin panel
              </span>
              <span className="text-muted-foreground">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}