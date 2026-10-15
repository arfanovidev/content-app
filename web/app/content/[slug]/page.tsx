'use client';

import { use } from 'react';
import Image from 'next/image';
import { useContent } from '@/hooks/useContent';
import { useCategories } from '@/hooks/useCategories';
import { BackButton } from '@/components/details/BackButton';
import { DetailsHeader } from '@/components/details/DetailsHeader';
import { ContentRenderer } from '@/components/details/ContentRenderer';
import { DetailsSkeleton } from '@/components/details/DetailsSkeleton';
import { NotFound } from '@/components/details/NotFound';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ContentPage({ params }: PageProps) {
  const { slug } = use(params);
  const { data: content, isLoading, isError } = useContent(slug);
  const { data: categories } = useCategories();

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  if (isError || !content) {
    return <NotFound />;
  }

  const category = categories?.find((c) => c.id === content.categoryId);

  return (
    <article className="container mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>

      <DetailsHeader content={content} category={category} />

      {content.coverImage && (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted">
          <Image
            src={content.coverImage}
            alt={content.title.en}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-8">
        <ContentRenderer delta={content.quillDelta} />
      </div>

      <div className="mt-12 border-t border-border pt-6">
        <BackButton />
      </div>
    </article>
  );
}