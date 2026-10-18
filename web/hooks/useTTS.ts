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
  const [error, setError] = useState<string | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wordsRef = useRef<string[]>([]);

  // Check support + pre-load voices on mount (helps iOS)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isSupported = isSpeechSupported();
    setSupported(isSupported);
    if (!isSupported) return;

    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
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
    setError(null);
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

    setError(null);
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
    utterance.volume = 1;

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

    utterance.onerror = (e) => {
      // iOS sometimes fires error with 'canceled' when user stops
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        setError(`Audio error: ${e.error}`);
      }
      stop();
    };

    utteranceRef.current = utterance;
    setStatus('playing');
    setActiveWordIndex(0);

    // CRITICAL: speak() must be called SYNCHRONOUSLY (no setTimeout)
    // iOS Safari blocks speech if not triggered directly in click handler
    try {
      window.speechSynthesis.speak(utterance);
    } catch (e: any) {
      setError(`Speech error: ${e?.message || 'unknown'}`);
      stop();
      return;
    }

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
      window.speechSynthesis.resume();
    }
    setStatus('playing');
  }, [supported]);

  return {
    status,
    activeWordIndex,
    supported,
    error,
    play,
    pause,
    resume,
    stop,
    isPlaying: status === 'playing',
    isPaused: status === 'paused',
  };
}