'use client';

import { use } from 'react';
import Link from 'next/link';
import { FileX2, ArrowLeft } from 'lucide-react';
import { useContents } from '@/hooks/useContents';
import { ContentForm } from '@/components/admin/ContentForm';
import { ContentFormSkeleton } from '@/components/admin/ContentFormSkeleton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditContentPage({ params }: PageProps) {
  const { id } = use(params);
  const { data: contents, isLoading, isError } = useContents();

  if (isLoading || isError) {
    return <ContentFormSkeleton />;
  }

  const content = contents?.find((c) => c.id === id);

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <FileX2 className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <h2 className="mt-4 text-base font-semibold tracking-tight">
          Content not found
        </h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          The content you&apos;re trying to edit either was deleted or never existed.
        </p>
        <Link
          href="/admin/content"
          className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
          Back to content
        </Link>
      </div>
    );
  }

  return <ContentForm initialData={content} mode="edit" />;
}