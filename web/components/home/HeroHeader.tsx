'use client';

import Image from 'next/image';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function HeroHeader() {
  const openSignup = () => useAuthStore.setState({ signupModalOpen: true });

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left: Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Brain className="h-3.5 w-3.5" />
              Where minds meet ideas
            </div>

            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              The mind,{' '}
              <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-zinc-500">
                explored
              </span>
            </h1>

            <p className="max-w-lg text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              A quiet space for neurological curiosities and philosophical
              reflections, written to be read slowly in English and Bangla.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openSignup}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
              >
                Explore
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={openSignup}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              >
                <Sparkles className="h-4 w-4" />
                Start reading
              </button>
            </div>

            {/* Small stats */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Free access
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
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
                  alt="Neural network"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80"
                  alt="Thoughtful reading"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>

            {/* Decorative blurs */}
            <div className="pointer-events-none absolute -left-4 top-1/4 hidden h-16 w-16 rounded-full bg-indigo-500/20 blur-2xl lg:block" />
            <div className="pointer-events-none absolute -right-4 bottom-1/4 hidden h-16 w-16 rounded-full bg-rose-500/20 blur-2xl lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}