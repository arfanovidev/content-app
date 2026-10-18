'use client';

import { useLocale } from 'next-intl';
import { useReadingTimer } from '@/hooks/useReadingTimer';
import { useCompleteContent } from '@/hooks/useCompleteContent';
import { useCompletedStore } from '@/store/completedStore';
import { useAuthStore } from '@/store/authStore';
import { ContentRenderer } from './ContentRenderer';
import { CompleteButton } from './CompleteButton';
import { pickText } from '@/lib/format';
import type { Content } from '@/types';

interface DetailsContentProps {
  content: Content;
}

export function DetailsContent({ content }: DetailsContentProps) {
  const locale = useLocale() as 'en' | 'bn';
  const isCompleted = useCompletedStore((s) => s.isCompleted(content.id));
  const isAuth = useAuthStore((s) => s.isAuthenticated());

  const timer = useReadingTimer(content.id, content.readTime);
  const completeMutation = useCompleteContent();

  const handleComplete = () => {
    if (!isAuth) {
      // Optionally show login modal
      return;
    }
    completeMutation.mutate({
      contentId: content.id,
      readDuration: timer.elapsed,
    });
  };

  const delta =
    locale === 'bn'
      ? content.quillDeltaBn || content.quillDeltaEn || content.quillDelta
      : content.quillDeltaEn || content.quillDeltaBn || content.quillDelta;

  const hasDelta =
    delta?.ops && Array.isArray(delta.ops) && delta.ops.length > 0;

  const fallbackText = pickText(content.shortDescription, locale);

  return (
    <div className="space-y-8 pb-8">
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

      {/* Complete button — extra spacing so it's always reachable */}
      <div className="pt-6 pb-8">
        <CompleteButton
          visible={timer.canComplete}
          isCompleted={isCompleted}
          isPending={completeMutation.isPending}
          onClick={handleComplete}
        />
      </div>
    </div>
  );
}