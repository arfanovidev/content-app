'use client';

import Link from 'next/link';
import { ArrowLeft, Heart, Users, Sparkles, MapPin, Clock, ArrowRight, Coffee, BookOpen } from 'lucide-react';

const ROLES = [
  {
    title: 'Full-stack Engineer',
    type: 'Full-time · Remote',
    dept: 'Engineering',
    desc: 'Help build fast, accessible reading experiences with Next.js and NestJS.',
  },
  {
    title: 'Content Writer (Bangla)',
    type: 'Part-time · Remote',
    dept: 'Content',
    desc: 'Write original Bangla stories on technology, culture, and daily life.',
  },
  {
    title: 'Content Writer (English)',
    type: 'Part-time · Remote',
    dept: 'Content',
    desc: 'Craft English essays that respect the reader\'s time and attention.',
  },
];

const VALUES = [
  { icon: Heart, title: 'Human-first', desc: 'No dark patterns, no engagement tricks, no "growth hacks".' },
  { icon: BookOpen, title: 'Reading first', desc: 'We build for readers, not metrics.' },
  { icon: Coffee, title: 'Calm work', desc: 'No standup theatre, no busy work. Ship meaningful things.' },
  { icon: Users, title: 'Small team', desc: 'Work directly with founders. Every voice matters.' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-gradient-to-br from-violet-50 via-white to-rose-50 dark:from-violet-950/30 dark:via-zinc-950 dark:to-rose-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mt-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-900 dark:bg-zinc-900/80 dark:text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              We&apos;re hiring
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Build the web you{' '}
              <span className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">wish existed</span>
            </h1>

            <p className="mt-4 text-base text-muted-foreground">
              We&apos;re a small team building a calm, ad-free reading platform. No growth targets, no VC pressure — just thoughtful work.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">Why work here</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-xl border border-border bg-card p-5">
                  <Icon className="h-5 w-5 text-violet-500" />
                  <h3 className="mt-3 text-sm font-semibold">{v.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">Open roles ({ROLES.length})</h2>

          <div className="mt-6 space-y-3">
            {ROLES.map((role) => (
              <div
                key={role.title}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-violet-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-violet-600 dark:text-violet-400">
                      {role.dept}
                    </p>
                    <h3 className="mt-1 text-base font-semibold">{role.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {role.type}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Remote
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{role.desc}</p>
                  </div>
                  <a
                    href={`mailto:careers@daccasolution.com?subject=Application: ${role.title}`}
                    className="shrink-0 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium transition-colors hover:bg-accent"
                  >
                    Apply
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t see your role?{' '}
              <a
                href="mailto:careers@daccasolution.com"
                className="font-medium text-violet-600 underline dark:text-violet-400"
              >
                Email us anyway
              </a>{' '}
              — we read every message.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-violet-600 to-rose-500 dark:from-violet-700 dark:to-rose-600">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <Sparkles className="mx-auto h-10 w-10 text-white/90" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Ship something good</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/90">
            Send your portfolio, GitHub, or a short note about why you care. We reply to every applicant.
          </p>
          <a
            href="mailto:careers@daccasolution.com"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-violet-700 hover:bg-zinc-50"
          >
            careers@daccasolution.com
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}