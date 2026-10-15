'use client';

import { useMemo } from 'react';
import { renderQuill } from '@/lib/quill';

interface ContentRendererProps {
  delta: any;
}

export function ContentRenderer({ delta }: ContentRendererProps) {
  const html = useMemo(() => renderQuill(delta), [delta]);

  if (!html) {
    return (
      <p className="text-muted-foreground italic">
        No content available.
      </p>
    );
  }

  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
        prose-p:leading-relaxed prose-p:text-foreground
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:font-semibold
        prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
        prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4
        prose-blockquote:border-l-primary prose-blockquote:italic
        prose-img:rounded-lg prose-img:shadow-sm
        prose-table:border prose-table:border-border
        prose-th:bg-muted prose-th:px-3 prose-th:py-2
        prose-td:border-t prose-td:border-border prose-td:px-3 prose-td:py-2
        prose-ul:my-4 prose-ol:my-4
        prose-li:my-1"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
