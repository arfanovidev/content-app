'use client';

import { useEffect, useRef, useState } from 'react';

const STORAGE_PREFIX = 'reading-progress-';

function loadProgress(contentId: string): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + contentId);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return typeof parsed?.elapsed === 'number' ? parsed.elapsed : 0;
  } catch {
    return 0;
  }
}

function saveProgress(contentId: string, elapsed: number) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      STORAGE_PREFIX + contentId,
      JSON.stringify({ elapsed, savedAt: Date.now() }),
    );
  } catch {
    // ignore
  }
}

export function useReadingTimer(contentId: string, minutes: number) {
  const [elapsed, setElapsed] = useState(() => loadProgress(contentId));
  const [isActive, setIsActive] = useState(true);
  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    const onVisibility = () => setIsActive(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () =>
      document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (!isActive) return;
    lastTickRef.current = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const delta = Math.floor((now - lastTickRef.current) / 1000);
      lastTickRef.current = now;
      setElapsed((e) => {
        const next = e + delta;
        saveProgress(contentId, next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, contentId]);

  const targetSeconds = minutes * 60;
  const progress = Math.min(elapsed / targetSeconds, 1);
  const canComplete = elapsed >= targetSeconds;

  return {
    elapsed,
    progress,
    canComplete,
    isActive,
  };
}