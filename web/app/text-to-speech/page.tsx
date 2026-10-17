'use client';

import Link from 'next/link';
import { ArrowLeft, Headphones, Volume2, Play, Pause, Square, Globe, Zap, Shield, CheckCircle2 } from 'lucide-react';

const FEATURES = [
  { icon: Volume2, title: 'Natural voice', desc: 'Uses your browser\'s built-in speech engine — no API keys, no data leaves your device.' },
  { icon: Globe, title: 'Two languages', desc: 'English and বাংলা supported. The voice matches the language of the article.' },
  { icon: Play, title: 'Play, pause, resume', desc: 'Full playback controls so you can listen while cooking, walking, or resting.' },
  { icon: Shield, title: 'Private by design', desc: 'Audio is generated locally in your browser. We never record or transmit your voice or listening habits.' },
  { icon: Zap, title: 'Instant', desc: 'No buffering, no waiting — playback starts immediately when you press play.' },
  { icon: Headphones, title: 'Works everywhere', desc: 'Chrome, Edge, Safari, and Firefox on desktop and mobile.' },
];

const STEPS = [
  { title: 'Open any story', desc: 'Browse to a public story from the home page.' },
  { title: 'Click the Play button', desc: 'The audio control sits just below the cover image.' },
  { title: 'Adjust as you go', desc: 'Pause, resume, or stop anytime. Switch language to hear the other version.' },
];

export default function TTSPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/30 dark:via-zinc-950 dark:to-indigo-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <Headphones className="h-10 w-10 text-blue-500" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Text-to-speech</span>
            </h1>
          </div>

          <p className="mt-4 max-w-lg text-base text-muted-foreground">
            Listen to any story in English or বাংলা — free, private, and instant. Powered by your browser, not the cloud.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              <Play className="h-4 w-4" />
              Try it now
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">Features</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-sm">
                  <Icon className="h-5 w-5 text-blue-500" />
                  <h3 className="mt-3 text-sm font-semibold">{f.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">How to use</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STEPS.map((step, idx) => (
              <div key={step.title} className="rounded-xl border border-border bg-card p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                  {idx + 1}
                </div>
                <h3 className="mt-3 text-sm font-semibold">{step.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">FAQ</h2>

          <div className="mt-6 space-y-3">
            {[
              { q: 'Does TTS work on mobile?', a: 'Yes. Works on iOS Safari and Android Chrome. Voice quality depends on your device.' },
              { q: 'Can I change the speed?', a: 'Default speed is 1x. Speed control is on our roadmap.' },
              { q: 'Does it work offline?', a: 'Yes, once the page is loaded. The browser handles speech locally.' },
              { q: 'Do you record my audio?', a: 'No. Nothing leaves your device. We don\'t even know you used it.' },
            ].map((item) => (
              <details key={item.q} className="group rounded-xl border border-border bg-card p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                  {item.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <Headphones className="mx-auto h-10 w-10 text-white/90" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Listen to something today</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/90">
            Press play on any story. Your eyes deserve a break.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-blue-700 hover:bg-zinc-50"
          >
            <Play className="h-4 w-4" />
            Browse stories
          </Link>
        </div>
      </section>
    </div>
  );
}