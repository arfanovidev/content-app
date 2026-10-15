'use client';

import { useState } from 'react';
import { useTTS } from '@/hooks/useTTS';
import { AudioPlayer } from './AudioPlayer';
import { HighlightedContent } from './HighlightedContent';
import type { Content } from '@/types';

interface DetailsContentProps {
  content: Content;
}

export function DetailsContent({ content }: DetailsContentProps) {
  const text = content.lang === 'bn' ? content.title.bn : content.title.en;
  const [useHighlight, setUseHighlight] = useState(false);

  const tts = useTTS({
    text,
    lang: content.lang,
  });

  const handlePlay = () => {
    setUseHighlight(true);
    if (tts.isPaused) {
      tts.resume();
    } else {
      tts.play();
    }
  };

  const handleStop = () => {
    tts.stop();
    setUseHighlight(false);
  };

  return (
    <div className="space-y-5">
      <AudioPlayer
        isPlaying={tts.isPlaying}
        isPaused={tts.isPaused}
        supported={tts.supported}
        onPlay={handlePlay}
        onPause={tts.pause}
        onStop={handleStop}
      />

      {useHighlight && text ? (
        <HighlightedContent text={text} activeIndex={tts.activeWordIndex} />
      ) : null}
    </div>
  );
}