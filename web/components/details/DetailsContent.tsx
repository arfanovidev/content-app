'use client';

import { useReadingTimer } from '@/hooks/useReadingTimer';
import { useCompleteContent } from '@/hooks/useCompleteContent';
import { useCompletedStore } from '@/store/completedStore';
import { useLangStore } from '@/store/langStore';
import { ContentRenderer } from './ContentRenderer';
import { CompleteButton } from './CompleteButton';
import { pickText } from '@/lib/format';
import type { Content } from '@/types';

interface DetailsContentProps {
  content: Content;
}

export function DetailsContent({ content }: DetailsContentProps) {
  const lang = useLangStore((s) => s.lang);
  const isCompleted = useCompletedStore((s) => s.isCompleted(content.id));

  const timer = useReadingTimer(content.id, content.readTime);
  const completeMutation = useCompleteContent();

  const handleComplete = () => {
    completeMutation.mutate({
      contentId: content.id,
      readDuration: timer.elapsed,
    });
  };

  // Pick delta by UI language with fallback chain
  const delta =
    lang === 'bn'
      ? content.quillDeltaBn || content.quillDeltaEn || content.quillDelta
      : content.quillDeltaEn || content.quillDeltaBn || content.quillDelta;

  const hasDelta =
    delta?.ops && Array.isArray(delta.ops) && delta.ops.length > 0;

  const fallbackText = pickText(content.shortDescription, lang);

  return (
    <div className="space-y-6">
      {hasDelta ? (
        <ContentRenderer delta={delta} />
      ) : fallbackText ? (
        <p className="text-base leading-relaxed text-foreground/90">
          {fallbackText}
        </p>
      ) : (
        <p className="text-sm italic text-muted-foreground">
          No content available.
        </p>
      )}

      <CompleteButton
        visible={timer.canComplete}
        isCompleted={isCompleted}
        isPending={completeMutation.isPending}
        onClick={handleComplete}
      />
    </div>
  );
}