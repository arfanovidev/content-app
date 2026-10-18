'use client';

import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';

export function HeroHeader() {
  const openSignup = () => useAuthStore.setState({ signupModalOpen: true });
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-indigo-50 via-background to-rose-50 dark:from-indigo-950/20 dark:via-background dark:to-rose-950/20">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="container relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left: Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-medium text-indigo-700 backdrop-blur-sm dark:border-indigo-800 dark:bg-zinc-900/80 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              {t('heroSubtitle')}
            </div>

            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
                {t('heroTitle')}
              </span>
            </h1>

            <p className="max-w-lg text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              A quiet space for curious minds. Stories in English and Bengali,
              designed to be read — or heard.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openSignup}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg active:scale-95"
              >
                {t('browseAll')}
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={openSignup}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {t('readMore')}
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                100% Free
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                No ads
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Bilingual
              </span>
            </div>
          </div>

          {/* Right: Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl ring-1 ring-border/50">
                <Image
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
                  alt="Reading"
                  fill
                  priority
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-2xl shadow-xl ring-1 ring-border/50">
                <Image
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80"
                  alt="Reading"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}