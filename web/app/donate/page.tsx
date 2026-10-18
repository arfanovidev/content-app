'use client';

import Link from 'next/link';
import {
  Heart,
  Phone,
  Mail,
  MessageCircle,
  Copy,
  Check,
  Shield,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { showSuccess } from '@/lib/toast';

const AMOUNTS = [
  { value: 100, label: '৳100', descKey: 'tea' },
  { value: 500, label: '৳500', descKey: 'boost' },
  { value: 1000, label: '৳1,000', descKey: 'running' },
  { value: 5000, label: '৳5,000', descKey: 'sponsor' },
];

const CONTACTS = [
  {
    icon: Phone,
    labelKey: 'call',
    value: '+880 1700-000000',
    href: 'tel:+8801700000000',
    hintKey: 'callHint',
  },
  {
    icon: Mail,
    labelKey: 'email',
    value: 'donate@daccasolution.com',
    href: 'mailto:donate@daccasolution.com',
    hintKey: 'emailHint',
  },
  {
    icon: MessageCircle,
    labelKey: 'whatsapp',
    value: '+880 1700-000000',
    href: 'https://wa.me/8801700000000',
    hintKey: 'whatsappHint',
  },
];

const FAQ_KEYS = ['1', '2', '3', '4'];

export default function DonatePage() {
  const [copied, setCopied] = useState<string | null>(null);
  const t = useTranslations('donate');

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      showSuccess(t('copied'), text);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-rose-950/30 dark:via-zinc-950 dark:to-amber-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToHome')}
          </Link>

          <div className="mt-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-lg">
              <Heart className="h-8 w-8" strokeWidth={2.5} />
            </div>

            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t('heroTitle')}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
              {t('heroSubtitle')}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-rose-700 backdrop-blur-sm dark:border-rose-900 dark:bg-zinc-900/80 dark:text-rose-300">
              <Sparkles className="h-3.5 w-3.5" />
              {t('heroBadge')}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WHY ==================== */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {t('whereGoesTitle')}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { titleKey: 'hostingTitle', descKey: 'hostingDesc' },
              { titleKey: 'contentTitle', descKey: 'contentDesc' },
              { titleKey: 'devTitle', descKey: 'devDesc' },
            ].map((item) => (
              <div
                key={item.titleKey}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <Shield className="h-6 w-6 text-rose-500" />
                <h3 className="mt-3 text-base font-semibold">
                  {t(`whereGoes.${item.titleKey}`)}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(`whereGoes.${item.descKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AMOUNT TIERS ==================== */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {t('amountsTitle')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            {t('amountsSubtitle')}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {AMOUNTS.map((amount) => (
              <div
                key={amount.value}
                className="rounded-2xl border border-border bg-card p-5 text-center transition-all hover:border-rose-300 hover:shadow-md"
              >
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {amount.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t(`amounts.${amount.descKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t('howToTitle')}
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              {t('howToSubtitle')}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CONTACTS.map((contact) => {
              const Icon = contact.icon;
              return (
                <div
                  key={contact.labelKey}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-rose-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold">
                    {t(`contacts.${contact.labelKey}`)}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">
                    <a
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex-1 truncate text-sm font-medium text-foreground hover:underline"
                    >
                      {contact.value}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(contact.value)}
                      aria-label={t('copy')}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {copied === contact.value ? (
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {t(`contacts.${contact.hintKey}`)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Direct bKash callout */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-amber-50 p-6 dark:border-rose-900 dark:from-rose-950/30 dark:to-amber-950/30 sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold">
                  {t('bkashTitle')}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t('bkashSubtitle', { number: '01700-000000' })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('01700000000')}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-rose-600 px-5 text-sm font-medium text-white transition-colors hover:bg-rose-700"
              >
                {copied === '01700000000' ? (
                  <>
                    <Check className="h-4 w-4" />
                    {t('copied')}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {t('copyNumber')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {t('faqTitle')}
          </h2>

          <div className="mt-10 space-y-3">
            {FAQ_KEYS.map((k) => (
              <details
                key={k}
                className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-rose-300"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
                  {t(`faq.q${k}`)}
                  <span className="text-muted-foreground transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`faq.a${k}`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="bg-gradient-to-br from-rose-500 to-amber-500 dark:from-rose-600 dark:to-amber-600">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <Heart
            className="mx-auto h-10 w-10 text-white/90"
            strokeWidth={2}
          />
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t('thanksTitle')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/90">
            {t('thanksSubtitle')}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-rose-600 transition-colors hover:bg-zinc-50"
            >
              <MessageCircle className="h-4 w-4" />
              {t('whatsappButton')}
            </a>
            <a
              href="mailto:donate@daccasolution.com"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Mail className="h-4 w-4" />
              {t('emailButton')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}