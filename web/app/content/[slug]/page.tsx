'use client';

import { use } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useContent } from '@/hooks/useContent';
import { useCategories } from '@/hooks/useCategories';
import { pickText, normalizeImageUrl } from '@/lib/format';
import { BackButton } from '@/components/details/BackButton';
import { DetailsHeader } from '@/components/details/DetailsHeader';
import { DetailsContent } from '@/components/details/DetailsContent';
import { DetailsSkeleton } from '@/components/details/DetailsSkeleton';
import { AudioPlayer } from '@/components/details/AudioPlayer';
import { useTTS } from '@/hooks/useTTS';
import type { Content } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ContentPage({ params }: PageProps) {
  const { slug } = use(params);
  const { data: content, isLoading, isError } = useContent(slug);
  const { data: categories } = useCategories();
  const locale = useLocale() as 'en' | 'bn';

  if (isLoading || isError || !content) {
    return <DetailsSkeleton />;
  }

  const category = categories?.find((c) => c.id === content.categoryId);
  const title = pickText(content.title, locale);
  const imageUrl = normalizeImageUrl(content.coverImage);

  return (
    <article className="container mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-6">
      <div className="mb-5">
        <BackButton />
      </div>

      <DetailsHeader content={content} category={category} />

      {imageUrl && (
        <div className="relative mt-6 aspect-video overflow-hidden rounded-xl border border-border bg-muted">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            className="object-cover"
          />
        </div>
      )}

      <AudioBar content={content} />

      <div className="mt-6">
        <DetailsContent content={content} />
      </div>

      <div className="mt-10 border-t border-border pt-6">
        <BackButton />
      </div>
    </article>
  );
}

function AudioBar({ content }: { content: Content }) {
  const locale = useLocale() as 'en' | 'bn';

  const delta =
    locale === 'bn'
      ? content.quillDeltaBn || content.quillDeltaEn || content.quillDelta
      : content.quillDeltaEn || content.quillDeltaBn || content.quillDelta;

  const articleText = delta?.ops?.length
    ? delta.ops
        .filter((op: any) => typeof op.insert === 'string')
        .map((op: any) => op.insert)
        .join('')
        .trim()
    : '';

  const text = articleText || pickText(content.title, locale);

  const tts = useTTS({
    text,
    lang: locale,
  });

  const handlePlay = () => {
    if (tts.isPaused) tts.resume();
    else tts.play();
  };

  return (
    <div className="mt-5">
      <AudioPlayer
        isPlaying={tts.isPlaying}
        isPaused={tts.isPaused}
        supported={tts.supported}
        onPlay={handlePlay}
        onPause={tts.pause}
        onStop={tts.stop}
      />
    </div>
  );
}