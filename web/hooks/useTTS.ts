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
  const [voicesReady, setVoicesReady] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wordsRef = useRef<string[]>([]);

  // Check support + load voices
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isSupported = isSpeechSupported();
    setSupported(isSupported);
    if (!isSupported) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesReady(true);
      }
    };

    // Try immediately
    loadVoices();
    // Also listen for async load (mobile browsers)
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
    // Retry voice pick if voices just became available
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

    utterance.onerror = () => {
      stop();
    };

    utteranceRef.current = utterance;
    setStatus('playing');
    setActiveWordIndex(0);

    // Critical for mobile: speak after small delay to allow voices to load
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, voicesReady ? 0 : 100);

    const interval = msPerWord(lang);
    timerRef.current = setInterval(() => {
      if (usingBoundary) return;
      idx += 1;
      if (idx < words.length) {
        setActiveWordIndex(idx);
      }
    }, interval);
  }, [supported, text, lang, clearTimer, stop, voicesReady]);

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
    play,
    pause,
    resume,
    stop,
    isPlaying: status === 'playing',
    isPaused: status === 'paused',
  };
}