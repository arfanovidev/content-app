'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Heart,
  Globe,
  Sparkles,
  Users,
  Zap,
  Target,
  Shield,
  PenTool,
  Headphones,
  Languages,
  ArrowRight,
  Code2,
  Briefcase,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const STATS = [
  { value: '2026', labelKey: 'founded' },
  { value: '2', labelKey: 'languages' },
  { value: '100%', labelKey: 'freeAccess' },
  { value: '0', labelKey: 'adsShown' },
];

const VALUES = [
  { icon: BookOpen, key: 'reading' },
  { icon: Languages, key: 'bilingual' },
  { icon: Headphones, key: 'listen' },
  { icon: Shield, key: 'tracking' },
];

const TIMELINE = [
  { yearKey: 'ideaYear', titleKey: 'ideaTitle', descKey: 'ideaDesc' },
  { yearKey: 'protoYear', titleKey: 'protoTitle', descKey: 'protoDesc' },
  { yearKey: 'launchYear', titleKey: 'launchTitle', descKey: 'launchDesc' },
  { yearKey: 'growYear', titleKey: 'growTitle', descKey: 'growDesc' },
];

const FEATURES = [
  { icon: Globe, key: 'twoLang' },
  { icon: Headphones, key: 'tts' },
  { icon: PenTool, key: 'original' },
  { icon: Zap, key: 'fast' },
  { icon: Users, key: 'community' },
  { icon: Target, key: 'focused' },
];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-indigo-50 via-white to-amber-50 dark:from-indigo-950/30 dark:via-zinc-950 dark:to-amber-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToHome')}
          </Link>

          <div className="mt-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-medium text-indigo-700 backdrop-blur-sm dark:border-indigo-900 dark:bg-zinc-900/80 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              {t('heroBadge')}
            </div>

            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t('heroTitleBefore')}{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">
                {t('heroTitleAfter')}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t('heroSubtitle')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                {t('startReading')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/donate"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Heart className="h-4 w-4 text-rose-500" />
                {t('supportUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t(`stats.${stat.labelKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== THE STORY ==================== */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="space-y-6 text-base leading-relaxed text-foreground/90 sm:text-lg">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t('whyStartedTitle')}
            </h2>

            <p>{t('whyStartedP1')}</p>

            <p>
              {t('whyStartedP2Before')}{' '}
              <strong className="text-foreground">2026</strong>{' '}
              {t('whyStartedP2After')}
            </p>

            <p>
              {t('whyStartedP3Before')}{' '}
              <strong className="text-foreground">{t('team.teamName')}</strong>{' '}
              {t('whyStartedP3After')}
            </p>

            <p>{t('whyStartedP4')}</p>
          </div>
        </div>
      </section>

      {/* ==================== VALUES ==================== */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {t('careAboutTitle')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            {t('careAboutSubtitle')}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.key}
                  className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">
                    {t(`values.${value.key}Title`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`values.${value.key}Desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {t('insideTitle')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            {t('insideSubtitle')}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.key}
                  className="rounded-xl border border-border bg-card p-5 transition-all hover:border-indigo-300 hover:shadow-sm"
                >
                  <Icon className="h-5 w-5 text-indigo-500" strokeWidth={2} />
                  <h3 className="mt-3 text-sm font-semibold">
                    {t(`features.${feature.key}Title`)}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {t(`features.${feature.key}Desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== TIMELINE ==================== */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {t('howWeGotHereTitle')}
          </h2>

          <div className="relative mt-10 space-y-6">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-border sm:left-4" />

            {TIMELINE.map((item, idx) => (
              <div key={item.titleKey} className="relative pl-10 sm:pl-14">
                <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-indigo-500 bg-background text-[10px] font-bold text-indigo-600 sm:h-8 sm:w-8 sm:text-xs">
                  {idx + 1}
                </div>
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {t(`timeline.${item.yearKey}`)}
                  </p>
                  <h3 className="mt-1 text-base font-semibold">
                    {t(`timeline.${item.titleKey}`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`timeline.${item.descKey}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TEAM ==================== */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            {t('madeByPeopleTitle')}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            {t('madeByPeopleSubtitle')}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-amber-500 text-2xl font-bold text-white">
                DS
              </div>
              <h3 className="mt-4 text-base font-semibold">
                {t('team.teamName')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('team.teamRole')}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {t('team.teamDesc')}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <a
                  href="https://github.com/arfanovidev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Code2 className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Briefcase className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-2xl font-bold text-white">
                <Heart className="h-7 w-7" strokeWidth={2.5} />
              </div>
              <h3 className="mt-4 text-base font-semibold">
                {t('team.youTitle')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('team.youRole')}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {t('team.youDesc')}
              </p>
              <div className="mt-4">
                <Link
                  href="/donate"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <Heart className="h-3 w-3 text-rose-500" />
                  {t('team.supportButton')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="bg-gradient-to-br from-indigo-600 to-amber-500 dark:from-indigo-700 dark:to-amber-600">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <Sparkles className="mx-auto h-10 w-10 text-white/90" />
          <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t('ctaTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/90">
            {t('ctaSubtitle')}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-indigo-700 transition-colors hover:bg-zinc-50"
            >
              {t('browseStories')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/donate"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Heart className="h-4 w-4" />
              {t('donateButton')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}