'use client';

import { useTTS } from '@/hooks/useTTS';
import { useReadingTimer } from '@/hooks/useReadingTimer';
import { useCompleteContent } from '@/hooks/useCompleteContent';
import { useCompletedStore } from '@/store/completedStore';
import { AudioPlayer } from './AudioPlayer';
import { HighlightedContent } from './HighlightedContent';
import { ReadingProgress } from './ReadingProgress';
import { CompleteButton } from './CompleteButton';
import type { Content } from '@/types';

interface DetailsContentProps {
  content: Content;
}

export function DetailsContent({ content }: DetailsContentProps) {
  const text = content.lang === 'bn' ? content.title.bn : content.title.en;
  const isCompleted = useCompletedStore((s) => s.isCompleted(content.id));

  const tts = useTTS({
    text,
    lang: content.lang,
  });

  const timer = useReadingTimer(content.id, content.readTime);
  const completeMutation = useCompleteContent();

  const handlePlay = () => {
    if (tts.isPaused) {
      tts.resume();
    } else {
      tts.play();
    }
  };

  const handleComplete = () => {
    completeMutation.mutate({
      contentId: content.id,
      readDuration: timer.elapsed,
    });
  };

  return (
    <div className="space-y-5">
      <ReadingProgress progress={timer.progress} />

      <AudioPlayer
        isPlaying={tts.isPlaying}
        isPaused={tts.isPaused}
        supported={tts.supported}
        onPlay={handlePlay}
        onPause={tts.pause}
        onStop={tts.stop}
      />

      {text ? (
        <HighlightedContent text={text} activeIndex={tts.activeWordIndex} />
      ) : null}

      <CompleteButton
        visible={timer.canComplete}
        isCompleted={isCompleted}
        isPending={completeMutation.isPending}
        onClick={handleComplete}
      />
    </div>
  );
}