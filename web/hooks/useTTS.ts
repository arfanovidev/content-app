'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  isSpeechSupported,
  msPerWord,
  pickVoice,
  splitIntoWords,
} from '@/lib/tts';

type TTSStatus = 'idle' | 'playing' | 'paused';

interface UseTTSOptions {
  text: string;
  lang: 'en' | 'bn';
}

export function useTTS({ text, lang }: UseTTSOptions) {
  const [status, setStatus] = useState<TTSStatus>('idle');
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [supported, setSupported] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wordsRef = useRef<string[]>([]);

  useEffect(() => {
    setSupported(isSpeechSupported());
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clearTimer();
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
    setStatus('idle');
    setActiveWordIndex(-1);
  }, [clearTimer]);

  useEffect(() => {
    return () => {
      clearTimer();
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    };
  }, [clearTimer]);

  const play = useCallback(() => {
    if (!supported || !text) return;

    clearTimer();
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }

    const words = splitIntoWords(text);
    wordsRef.current = words;

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;
    utterance.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1;

    let idx = 0;
    let usingBoundary = false;

    utterance.onboundary = (e) => {
      if (e.name === 'word' && text.length > 0) {
        usingBoundary = true;
        const ratio = e.charIndex / text.length;
        const wordIdx = Math.min(
          Math.round(ratio * words.length),
          words.length - 1,
        );
        idx = wordIdx;
        setActiveWordIndex(wordIdx);
      }
    };

    utterance.onend = () => {
      stop();
    };

    utterance.onerror = () => {
      stop();
    };

    utteranceRef.current = utterance;
    setStatus('playing');
    setActiveWordIndex(0);

    window.speechSynthesis.speak(utterance);

    const interval = msPerWord(lang);
    timerRef.current = setInterval(() => {
      if (usingBoundary) return;
      idx += 1;
      if (idx < words.length) {
        setActiveWordIndex(idx);
      }
    }, interval);
  }, [supported, text, lang, clearTimer, stop]);

  const pause = useCallback(() => {
    if (!supported) return;

    if (typeof window !== 'undefined') {
      window.speechSynthesis.pause();
    }
    setStatus('paused');
    clearTimer();
  }, [supported, clearTimer]);

  const resume = useCallback(() => {
    if (!supported) return;

    if (typeof window !== 'undefined') {
      // Workaround: Chrome speechSynthesis.resume() sometimes doesn't fire
      window.speechSynthesis.resume();
    }
    setStatus('playing');
  }, [supported]);

  return {
    status,
    activeWordIndex,
    supported,
    play,
    pause,
    resume,
    stop,
    isPlaying: status === 'playing',
    isPaused: status === 'paused',
  };
}