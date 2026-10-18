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
      className="prose prose-neutral dark:prose-invert max-w-none break-words
        /* headings */
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
        /* body */
        prose-p:leading-relaxed prose-p:text-foreground
        /* links */
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-a:break-words
        /* emphasis */
        prose-strong:font-semibold
        /* inline code */
        prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5
        prose-code:text-sm prose-code:break-words
        /* code blocks — scroll internally */
        prose-pre:rounded-lg prose-pre:bg-muted prose-pre:p-4
        prose-pre:overflow-x-auto prose-pre:max-w-full
        prose-pre:whitespace-pre
        /* blockquote */
        prose-blockquote:border-l-primary prose-blockquote:italic
        /* images — never exceed container */
        prose-img:rounded-lg prose-img:shadow-sm
        prose-img:max-w-full prose-img:h-auto
        /* tables — scroll internally */
        prose-table:border prose-table:border-border
        prose-table:block prose-table:overflow-x-auto prose-table:max-w-full
        prose-th:bg-muted prose-th:px-3 prose-th:py-2 prose-th:whitespace-nowrap
        prose-td:border-t prose-td:border-border prose-td:px-3 prose-td:py-2
        /* lists */
        prose-ul:my-4 prose-ol:my-4
        prose-li:my-1 prose-li:break-words
        /* misc */
        prose-hr:border-border
        prose-video:max-w-full prose-video:h-auto
        prose-iframe:max-w-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}