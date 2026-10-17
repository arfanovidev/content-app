'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Heart, TrendingUp, User, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCompleted } from '@/hooks/useCompleted';
import { useContents } from '@/hooks/useContents';
import { CardSkeleton } from '@/components/home/CardSkeleton';

export default function UserDashboard() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const hydrated = useAuthStore((s) => s._hasHydrated);
  const { data: completed, isLoading: loadingCompleted } = useCompleted();
  const { data: contents, isLoading: loadingContents } = useContents();

  useEffect(() => {
    if (hydrated && !isAuth) {
      router.replace('/');
    }
  }, [hydrated, isAuth, router]);

  if (!hydrated || !user) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Available Stories',
      value: loadingContents ? '—' : (contents?.length ?? 0),
      icon: BookOpen,
      href: '/',
    },
    {
      label: 'Completed',
      value: loadingCompleted ? '—' : (completed?.length ?? 0),
      icon: TrendingUp,
      href: '/favorites',
    },
    {
      label: 'Favorites',
      value: loadingCompleted ? '—' : (completed?.length ?? 0),
      icon: Heart,
      href: '/favorites',
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back, {user.username}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s your reading journey
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                {stat.label}
              </div>
              <p className="mt-2 text-3xl font-bold tracking-tight">
                {stat.value}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mt-6 rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold">Quick actions</h2>
        </div>
        <div className="divide-y divide-border">
          <Link
            href="/"
            className="group flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-accent"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              Browse all stories
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/favorites"
            className="group flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-accent"
          >
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              My favorites
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/profile"
            className="group flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-accent"
          >
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Profile settings
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}