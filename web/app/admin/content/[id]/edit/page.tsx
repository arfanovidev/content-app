'use client';

import { use } from 'react';
import { Loader2 } from 'lucide-react';
import { useContents } from '@/hooks/useContents';
import { ContentForm } from '@/components/admin/ContentForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditContentPage({ params }: PageProps) {
  const { id } = use(params);
  const { data: contents, isLoading } = useContents();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const content = contents?.find((c) => c.id === id);

  if (!content) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
        <p className="text-sm text-muted-foreground">Content not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Edit Content
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update content details
        </p>
      </div>

      <ContentForm initialData={content} mode="edit" />
    </div>
  );
}