'use client';

import { useTranslations } from 'next-intl';

const RULE_KEYS = ['kind', 'value', 'honest', 'respect', 'privacy'] as const;

export default function RulesPage() {
  const t = useTranslations('rules');

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      {/* Header */}
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {t('eyebrow')}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t('subtitle')}
        </p>
      </header>

      {/* Rules — numbered */}
      <ol className="mt-12 space-y-10">
        {RULE_KEYS.map((key, index) => (
          <li key={key} className="grid grid-cols-[auto_1fr] gap-5 sm:gap-6">
            <span
              aria-hidden
              className="select-none font-mono text-3xl font-semibold leading-none text-muted-foreground/40 sm:text-4xl"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h2 className="text-lg font-semibold leading-snug">
                {t(`items.${key}.title`)}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {t(`items.${key}.body`)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Divider */}
      <hr className="my-14 border-border" />

      {/* Footer */}
      <footer>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t('footer')}
        </p>
        <a
          href="mailto:hello@contentapp.dev"
          className="mt-3 inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline"
        >
          hello@contentapp.dev
        </a>
      </footer>
    </div>
  );
}