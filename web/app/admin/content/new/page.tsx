'use client';

import { ContentForm } from '@/components/admin/ContentForm';

export default function NewContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          New Content
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a new content piece
        </p>
      </div>

      <ContentForm mode="create" />
    </div>
  );
}