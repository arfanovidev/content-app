'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { ContentList } from '@/components/admin/ContentList';
import { ROUTES } from '@/lib/constants';

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Content
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all content
          </p>
        </div>
        <Link
          href={ROUTES.ADMIN_CONTENT_NEW}
          className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          New
        </Link>
      </div>

      <ContentList />
    </div>
  );
}