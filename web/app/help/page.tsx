'use client';

import Link from 'next/link';
import { ArrowLeft, Search, BookOpen, Headphones, User, CreditCard, Bug, MessageCircle, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { icon: BookOpen, title: 'Reading', desc: 'How to use reader mode, progress, favorites', href: '#reading' },
  { icon: Headphones, title: 'Text-to-speech', desc: 'Enable audio, voice, and playback controls', href: '#tts' },
  { icon: User, title: 'Account', desc: 'Sign up, sign in, and manage your profile', href: '#account' },
  { icon: CreditCard, title: 'Support & donations', desc: 'How to donate and reach the team', href: '/donate' },
  { icon: Bug, title: 'Bugs & issues', desc: 'Report problems, request features', href: '#bugs' },
  { icon: MessageCircle, title: 'Contact', desc: 'Email, WhatsApp, and response times', href: '#contact' },
];

const FAQS = [
  {
    section: 'Reading',
    items: [
      { q: 'How do I mark a story as complete?', a: 'Open any story and scroll down. When you reach the bottom, tap "Mark as Complete". It saves to your favorites automatically.' },
      { q: 'Can I read without an account?', a: 'Yes — public stories are open to everyone. Sign in to save favorites, reading progress, and sync across devices.' },
      { q: 'How does reading progress work?', a: 'The percentage at the top shows how much of the story you have scrolled. It resets when you leave and resumes next time you open.' },
    ],
  },
  {
    section: 'Text-to-speech',
    items: [
      { q: 'Which languages support TTS?', a: 'Both English and বাংলা. Click the Play button on any story to start audio. Voice quality depends on your browser and OS.' },
      { q: 'Can I control the speed?', a: 'Yes — pause, resume, and stop controls are available. Default speed is 1x.' },
    ],
  },
  {
    section: 'Account',
    items: [
      { q: 'How do I sign up?', a: 'Click "Sign up" in the navbar, then choose Google or email. No password needed for Google sign-in.' },
      { q: 'I forgot my password. What now?', a: 'Use Google sign-in to recover access. For email accounts, contact support@daccasolution.com.' },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-sky-50 via-white to-emerald-50 dark:from-sky-950/30 dark:via-zinc-950 dark:to-emerald-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            How can we{' '}
            <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">help?</span>
          </h1>

          <p className="mt-3 max-w-lg text-base text-muted-foreground">
            Find answers, guides, and ways to reach the team.
          </p>

          <div className="relative mt-8 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search help articles..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">Browse by topic</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-sky-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{cat.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{cat.desc}</p>
                  <ArrowRight className="mt-3 h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">Frequently asked</h2>

          <div className="mt-6 space-y-8">
            {FAQS.map((section) => (
              <div key={section.section}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {section.section}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-sky-300"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                        {item.q}
                        <span className="text-muted-foreground transition-transform group-open:rotate-180">▾</span>
                      </summary>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gradient-to-br from-sky-500 to-emerald-500 dark:from-sky-600 dark:to-emerald-600">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <MessageCircle className="mx-auto h-10 w-10 text-white/90" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Still stuck?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/90">
            Email us at <strong>support@daccasolution.com</strong> — we usually reply within 24 hours.
          </p>
          <a
            href="mailto:support@daccasolution.com"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-sky-700 hover:bg-zinc-50"
          >
            <MessageCircle className="h-4 w-4" />
            Email support
          </a>
        </div>
      </section>
    </div>
  );
}