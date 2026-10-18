'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useMessages } from '@/hooks/useMessages';

export function BackButton() {
  const router = useRouter();
  const t = useMessages();

  const handleBack = () => {
    // Check if there's browser history to go back to
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      // Fallback to home if no history (direct URL entry)
      router.push('/');
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={2} />
      <span>{t.details?.back || 'Back'}</span>
    </button>
  );
}