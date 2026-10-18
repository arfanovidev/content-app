'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchLocale(newLocale: 'en' | 'bn') {
    if (newLocale === locale) return;

    // Save to cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

    // Refresh to re-render with new locale
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1">
      <Globe className="h-3.5 w-3.5 text-muted-foreground ml-1" />
      <button
        type="button"
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
          locale === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchLocale('bn')}
        disabled={isPending}
        className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
          locale === 'bn'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
        }`}
      >
        বাং
      </button>
    </div>
  );
}