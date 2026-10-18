'use client';

import { useState } from 'react';
import { Copy, Check, Heart, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { showSuccess } from '@/lib/toast';

const AMOUNTS = [
  { value: 100, descKey: 'tea' },
  { value: 500, descKey: 'boost' },
  { value: 1000, descKey: 'running' },
  { value: 5000, descKey: 'sponsor' },
];

export default function DonatePage() {
  const [copied, setCopied] = useState(false);
  const t = useTranslations('donate');

  const bKashNumber = '01700000000';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bKashNumber);
      setCopied(true);
      showSuccess(t('copied'), bKashNumber);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <header className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Heart className="h-6 w-6 text-foreground/70" strokeWidth={2} />
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t('heroTitle')}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {t('heroSubtitle')}
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t('amountsTitle')}
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AMOUNTS.map((a) => (
            <div
              key={a.value}
              className="rounded-lg border border-border bg-background p-4 text-center"
            >
              <p className="text-lg font-semibold">৳{a.value.toLocaleString('en-US')}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t(`amounts.${a.descKey}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t('bkashTitle')}
        </h2>
        <div className="mt-4 rounded-lg border border-border bg-background p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-lg font-semibold tracking-tight">
                {bKashNumber}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t('bkashSubtitle', { number: bKashNumber })}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  {t('copied')}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {t('copy')}
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t('howToTitle')}
        </h2>
        <div className="mt-4 rounded-lg border border-border bg-background p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t('howToSubtitle')}
          </p>
          <a
            href="mailto:donate@daccasolution.com"
            className="mt-4 inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            donate@daccasolution.com
          </a>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          FAQ
        </h2>
        <div className="mt-4 space-y-4">
          <details className="group rounded-lg border border-border bg-background p-4">
            <summary className="cursor-pointer list-none text-sm font-medium">
              Where does my donation go?
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Hosting, content writing, and engineering time. There is no office, no
              marketing budget, no VC. Every taka goes to keeping the platform running.
            </p>
          </details>
          <details className="group rounded-lg border border-border bg-background p-4">
            <summary className="cursor-pointer list-none text-sm font-medium">
              Is my donation tax-deductible?
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Content App is an independent project, not a registered charity. Donations
              are personal contributions, not tax-deductible gifts.
            </p>
          </details>
          <details className="group rounded-lg border border-border bg-background p-4">
            <summary className="cursor-pointer list-none text-sm font-medium">
              Can I donate in a currency other than BDT?
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Yes. We accept bKash (BDT) for local supporters, and bank transfer / Wise
              for international supporters. Email us for details.
            </p>
          </details>
          <details className="group rounded-lg border border-border bg-background p-4">
            <summary className="cursor-pointer list-none text-sm font-medium">
              Will donating unlock extra features?
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              No. Content App is the same for everyone — free, ad-free, bilingual.
              Donations are support, not a subscription.
            </p>
          </details>
        </div>
      </section>

      <p className="mt-12 text-center text-xs leading-relaxed text-muted-foreground">
        {t('thanksSubtitle')}
      </p>
    </article>
  );
}