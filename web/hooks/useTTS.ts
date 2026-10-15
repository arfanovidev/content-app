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
  onWordChange?: (index: number) => void;
}

export function useTTS({ text, lang, onWordChange }: UseTTSOptions) {
  const [status, setStatus] = useState<TTSStatus>('idle');
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [supported, setSupported] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wordsRef = useRef<string[]>([]);

  useEffect(() => {
    setSupported(isSpeechSupported());
  }, []);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const stop = useCallback(() => {
    cleanup();
    setStatus('idle');
    setActiveWordIndex(-1);
    onWordChange?.(-1);
  }, [cleanup, onWordChange]);

  const play = useCallback(() => {
    if (!supported || !text) return;

    cleanup();

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
        onWordChange?.(wordIdx);
      }
    };

    utterance.onend = () => {
      stop();
    };

    utterance.onerror = () => {
      stop();
    };

    setStatus('playing');
    setActiveWordIndex(0);
    onWordChange?.(0);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);

    // Fallback timer if onboundary doesn't fire
    const interval = msPerWord(lang);
    timerRef.current = setInterval(() => {
      if (usingBoundary) return;
      idx += 1;
      if (idx < words.length) {
        setActiveWordIndex(idx);
        onWordChange?.(idx);
      }
    }, interval);
  }, [supported, text, lang, cleanup, stop, onWordChange]);

  const pause = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setStatus('paused');
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.resume();
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