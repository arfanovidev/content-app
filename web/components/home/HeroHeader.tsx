'use client';

import Image from 'next/image';
import { ArrowRight, BookOpen, Headphones, Globe2, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';

export function HeroHeader() {
  const openSignup = () => useAuthStore.setState({ signupModalOpen: true });
  const t = useTranslations('home');

  return (
    <div className="min-h-screen">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-zinc-500/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-zinc-500/5 blur-3xl" />

        <div className="container relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {t('heroSubtitle')}
              </div>

              <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {t('heroTitle')}
              </h1>

              <p className="max-w-lg text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                A quiet space for curious minds. Stories in English and Bengali,
                designed to be read — or heard.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={openSignup}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Start reading
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="/about"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  About Content App
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src="/logo.png"
                  alt="Content App"
                  width={400}
                  height={530}
                  className="h-full w-full object-contain p-8"
                  priority
                />
              </div>
              <div className="mt-8 aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src="/og-image.png"
                  alt="Content App preview"
                  width={400}
                  height={210}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTRO / MISSION ============ */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Reading, on your own terms
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Content App is a bilingual reading and research platform built for people
              who want to read deeply — not scroll endlessly. It works in English and
              Bengali with the same care, with native text-to-speech, saved favorites,
              and reading progress that actually helps.
            </p>
            <p>
              There are no ads, no trackers, and no algorithmic feed. You choose what
              to read, when to read it, and whether to listen. Everything else is quiet.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FEATURES GRID ============ */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What makes it different
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Four small choices that add up to a calmer reading experience.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Globe2 className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
              <h3 className="mt-3 text-base font-semibold">Bilingual by design</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                English and Bengali sit side by side — not as translations, but as
                equals. Switch languages anytime without losing your place.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <Headphones className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
              <h3 className="mt-3 text-base font-semibold">Listen anywhere</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Native text-to-speech in both languages. Free, offline in many cases,
                and private — nothing leaves your device.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <BookOpen className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
              <h3 className="mt-3 text-base font-semibold">Track what you finish</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                A quiet reading-progress bar, a favorites list, and a small streak
                counter. No dashboards, no anxiety.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <Sparkles className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
              <h3 className="mt-3 text-base font-semibold">No ads. No tracking.</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                No banner ads, no third-party analytics, no data selling. The reader is
                not the product — that is the whole point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Who it&apos;s for
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Bilingual readers</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Students, researchers, and curious readers who move between English and
                Bengali every day — and want a tool that respects both.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Listeners</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Commuters, cooks, and caretakers who want to keep reading with their
                ears while their hands are busy.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Writers</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                People who want a quiet place to publish thoughtful essays — without
                growth hacks, engagement tricks, or an algorithm deciding who reads them.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Educators</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Teachers and tutors looking for a bilingual reading platform their
                students can trust — free, ad-free, and private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-8 space-y-4">
            <details className="group rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer list-none text-sm font-medium">
                Is Content App free?
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Yes. No paywall, no subscription. Reader support (donations) keeps it
                running, but everything is readable without paying.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer list-none text-sm font-medium">
                Do I need an account to read?
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Public stories are open to everyone. An account lets you save favorites,
                track progress, and pick up where you left off across devices.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer list-none text-sm font-medium">
                How does text-to-speech work?
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                It uses your browser&apos;s native Web Speech API. The voice is generated
                on your device — free, private, and available in both English and
                Bengali.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer list-none text-sm font-medium">
                Is my data safe?
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We collect the minimum: an email, a username, and your reading progress.
                No ads, no trackers, no data selling. See our{' '}
                <a href="/privacy" className="underline hover:no-underline">
                  Privacy Policy
                </a>
                .
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section>
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Start reading
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            No sign-up wall on public stories. Create a free account when you want to
            save favorites and pick up where you left off.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={openSignup}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Create free account
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="/about"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              About Content App
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}