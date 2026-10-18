'use client';

import Link from 'next/link';
import { ArrowLeft, ScrollText, Heart, MessageCircle, ShieldCheck, Ban } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function RulesPage() {
  const t = useTranslations('rules');

  const RULES = [
    { icon: Heart, titleKey: 'kindTitle', descKey: 'kindDesc' },
    { icon: MessageCircle, titleKey: 'valueTitle', descKey: 'valueDesc' },
    { icon: ShieldCheck, titleKey: 'honestTitle', descKey: 'honestDesc' },
    { icon: Ban, titleKey: 'respectTitle', descKey: 'respectDesc' },
  ];

  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950/30 dark:via-zinc-950 dark:to-orange-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </Link>

          <div className="mt-8">
            <ScrollText className="h-10 w-10 text-amber-500" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              {t('subtitle')}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('intro')}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {RULES.map((rule) => {
              const Icon = rule.icon;
              return (
                <div key={rule.titleKey} className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
                  <Icon className="h-6 w-6 text-amber-500" />
                  <h3 className="mt-3 text-base font-semibold">{t(`rules.${rule.titleKey}` as any)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`rules.${rule.descKey}` as any)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <Heart className="mx-auto h-10 w-10 text-white/90" />
          <h2 className="mt-4 text-2xl font-bold text-white">{t('ctaTitle')}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/90">{t('ctaSubtitle')}</p>
          <Link href="/" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-amber-700 hover:bg-zinc-50">
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}