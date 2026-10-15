'use client';

import Link from 'next/link';
import { FileText, FolderOpen, Plus, ArrowUpRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useContents } from '@/hooks/useContents';
import { useCategories } from '@/hooks/useCategories';
import { useAuthStore } from '@/store/authStore';
import { useMessages } from '@/hooks/useMessages';

export default function AdminDashboard() {
  const t = useMessages();
  const user = useAuthStore((s) => s.user);
  const { data: contents, isLoading: loadingContents } = useContents();
  const { data: categories, isLoading: loadingCategories } = useCategories();

  const stats = [
    {
      label: t.admin.totalContents,
      value: loadingContents ? '—' : (contents?.length ?? 0),
      icon: FileText,
      href: ROUTES.ADMIN_CONTENT_NEW.replace('/new', ''),
    },
    {
      label: t.admin.totalCategories,
      value: loadingCategories ? '—' : (categories?.length ?? 0),
      icon: FolderOpen,
      href: ROUTES.ADMIN_CATEGORIES,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t.admin.dashboard}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.admin.welcomeBack}, {user?.username}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group flex items-center justify-between rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1.5 text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-5">
        <h2 className="text-lg font-semibold tracking-tight">
          {t.admin.quickActions}
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={ROUTES.ADMIN_CONTENT_NEW}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            {t.admin.newContent}
          </Link>
          <Link
            href={ROUTES.ADMIN_CATEGORIES}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent"
          >
            <FolderOpen className="h-4 w-4" strokeWidth={2} />
            {t.admin.manageCategories}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}