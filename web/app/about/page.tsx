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

const STATS = [
  { value: '2026', label: 'Founded' },
  { value: '2', label: 'Languages' },
  { value: '100%', label: 'Free access' },
  { value: '0', label: 'Ads shown' },
];

const VALUES = [
  {
    icon: BookOpen,
    title: 'Reading first',
    desc: 'Clean typography, distraction-free layouts, and reading progress that actually helps.',
  },
  {
    icon: Languages,
    title: 'Bilingual by design',
    desc: 'Every story is written and available in English and à¦¬à¦¾à¦‚à¦²à¦¾ â€” not auto-translated.',
  },
  {
    icon: Headphones,
    title: 'Listen anywhere',
    desc: 'Built-in text-to-speech lets you listen while commuting, cooking, or resting your eyes.',
  },
  {
    icon: Shield,
    title: 'No tracking',
    desc: 'No analytics pixels, no ad networks, no third-party trackers following you around.',
  },
];

const TIMELINE = [
  {
    year: '2026 Q1',
    title: 'The idea',
    desc: 'Frustrated by ad-heavy reading platforms, we sketched a simple, honest reading app.',
  },
  {
    year: '2026 Q2',
    title: 'First prototype',
    desc: 'A bilingual reading experience with TTS was built and tested with a small circle.',
  },
  {
    year: '2026 Q3',
    title: 'Public launch',
    desc: 'Content App went live â€” free for everyone, no sign-up wall on public stories.',
  },
  {
    year: 'Next',
    title: 'Growing',
    desc: 'Adding more stories, better accessibility, and a mobile app in the pipeline.',
  },
];

const FEATURES = [
  {
    icon: Globe,
    title: 'Two languages',
    desc: 'English and à¦¬à¦¾à¦‚à¦²à¦¾ side-by-side. Switch anytime with one click.',
  },
  {
    icon: Headphones,
    title: 'Text to speech',
    desc: 'Natural voice reading in both languages â€” perfect for multi-tasking.',
  },
  {
    icon: PenTool,
    title: 'Original writing',
    desc: 'Stories written by humans, edited by humans, for humans.',
  },
  {
    icon: Zap,
    title: 'Fast & offline-ready',
    desc: 'Built with Next.js and optimized for slow networks.',
  },
  {
    icon: Users,
    title: 'Community-driven',
    desc: 'Suggestions, corrections, and requests come from readers like you.',
  },
  {
    icon: Target,
    title: 'Focused design',
    desc: 'One job, done well: helping you read and finish what you start.',
  },
];

export default function AboutPage() {
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
            Back to home
          </Link>

          <div className="mt-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-medium text-indigo-700 backdrop-blur-sm dark:border-indigo-900 dark:bg-zinc-900/80 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Our Story
            </div>

            <h1 className="mt-5 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Reading, the way it{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-amber-600 bg-clip-text text-transparent">
                should be
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Content App is a quiet corner of the internet â€” no ads, no
              tracking, no algorithmic noise. Just carefully chosen stories in
              English and à¦¬à¦¾à¦‚à¦²à¦¾, built to be read, understood, and remembered.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Start reading
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/donate"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Heart className="h-4 w-4 text-rose-500" />
                Support us
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
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
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
              Why we started
            </h2>

            <p>
              The web has become loud. Every article is wrapped in autoplay
              videos, pop-ups, cookie banners, and three different ad networks.
              We got tired of it â€” so we built something else.
            </p>

            <p>
              Content App started as a small experiment in{' '}
              <strong className="text-foreground">2026</strong>: what if
              reading could feel calm again? What if stories respected your
              attention, and what if bilingual readers didn&apos;t have to
              choose between languages?
            </p>

            <p>
              We&apos;re built and maintained by{' '}
              <strong className="text-foreground">Dacca Solution</strong>, a
              small team based in Dhaka, Bangladesh. We&apos;re not a startup
              chasing scale â€” we&apos;re readers who wanted a better reading
              experience and decided to make one.
            </p>

            <p>
              This isn&apos;t a product. It&apos;s a project. It exists because
              people show up to read, give feedback, and occasionally help
              cover hosting costs. If you find something useful here, that
              means we did our job.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== VALUES ==================== */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            What we care about
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            Four principles guide every decision we make.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {value.desc}
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
            What&apos;s inside
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            Small details that add up to a calmer reading experience.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-card p-5 transition-all hover:border-indigo-300 hover:shadow-sm"
                >
                  <Icon className="h-5 w-5 text-indigo-500" strokeWidth={2} />
                  <h3 className="mt-3 text-sm font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {feature.desc}
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
            How we got here
          </h2>

          <div className="relative mt-10 space-y-6">
            {/* vertical line */}
            <div className="absolute left-3 top-2 bottom-2 w-px bg-border sm:left-4" />

            {TIMELINE.map((item, idx) => (
              <div key={item.year} className="relative pl-10 sm:pl-14">
                <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-indigo-500 bg-background text-[10px] font-bold text-indigo-600 sm:h-8 sm:w-8 sm:text-xs">
                  {idx + 1}
                </div>
                <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {item.year}
                  </p>
                  <h3 className="mt-1 text-base font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
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
            Made by people
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
            A small team based in Dhaka â€” with a lot of help from readers.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-amber-500 text-2xl font-bold text-white">
                DS
              </div>
              <h3 className="mt-4 text-base font-semibold">Dacca Solution</h3>
              <p className="text-sm text-muted-foreground">Product &amp; Engineering</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Small team of engineers and writers who built Content App from
                scratch.
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
              <h3 className="mt-4 text-base font-semibold">You</h3>
              <p className="text-sm text-muted-foreground">Reader &amp; supporter</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                The reason this project keeps going. Thank you for being here.
              </p>
              <div className="mt-4">
                <Link
                  href="/donate"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <Heart className="h-3 w-3 text-rose-500" />
                  Support
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
            Read something worth your time.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/90">
            No sign-up wall on public stories. Start reading and see how it
            feels.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-indigo-700 transition-colors hover:bg-zinc-50"
            >
              Browse stories
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/donate"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Heart className="h-4 w-4" />
              Donate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}