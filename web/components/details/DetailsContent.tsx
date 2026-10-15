'use client';

import { useTTS } from '@/hooks/useTTS';
import { AudioPlayer } from './AudioPlayer';
import { HighlightedContent } from './HighlightedContent';
import type { Content } from '@/types';

interface DetailsContentProps {
  content: Content;
}

export function DetailsContent({ content }: DetailsContentProps) {
  const text = content.lang === 'bn' ? content.title.bn : content.title.en;

  const tts = useTTS({
    text,
    lang: content.lang,
  });

  const handlePlay = () => {
    if (tts.isPaused) {
      tts.resume();
    } else {
      tts.play();
    }
  };

  return (
    <div className="space-y-5">
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
    </div>
  );
}