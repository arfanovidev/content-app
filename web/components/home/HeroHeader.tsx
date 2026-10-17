'use client';

import Image from 'next/image';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function HeroHeader() {
  const openSignup = useAuthStore((s) => s.openSignup);

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <Sparkles className="h-3.5 w-3.5" />
              New stories every day
            </div>

            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Human{' '}
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:to-zinc-400">
                stories
              </span>{' '}
              &amp; ideas
            </h1>

            <p className="max-w-lg text-balance text-base text-muted-foreground sm:text-lg">
              A place to read, write, and deepen your understanding — in English
              and বাংলা.
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
                className="inline-flex h-11 items-center rounded-full border border-zinc-300 bg-white px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              >
                Get started
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}