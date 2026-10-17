'use client';

import Link from 'next/link';
import { ArrowLeft, Download, Mail, FileText, Palette, Camera, MessageSquare } from 'lucide-react';

const ASSETS = [
  { icon: Palette, title: 'Logo pack', desc: 'SVG, PNG in light and dark variants', size: '2.4 MB', ext: '.zip' },
  { icon: Camera, title: 'Screenshots', desc: 'Home, reader, admin panel', size: '5.1 MB', ext: '.zip' },
  { icon: FileText, title: 'Brand guidelines', desc: 'Colors, typography, do & don\'t', size: '1.2 MB', ext: '.pdf' },
];

const FACTS = [
  { label: 'Founded', value: '2026' },
  { label: 'Based in', value: 'Dhaka, Bangladesh' },
  { label: 'Team size', value: '2-5 people' },
  { label: 'Languages', value: 'English, বাংলা' },
  { label: 'Pricing', value: 'Free' },
  { label: 'Funding', value: 'Bootstrapped' },
];

const BOILERPLATE = `Content App is a bilingual reading platform based in Dhaka, Bangladesh. Founded in 2026, it provides carefully curated stories in English and বাংলা without ads, paywalls, or tracking. Built by Dacca Solution.`;

export default function PressPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950/30 dark:via-zinc-950 dark:to-orange-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
            Press &amp; media{' '}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">kit</span>
          </h1>
          <p className="mt-3 max-w-lg text-base text-muted-foreground">
            Everything you need to write about Content App — logos, screenshots, brand guidelines, and facts.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">Download assets</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ASSETS.map((asset) => {
              const Icon = asset.icon;
              return (
                <div key={asset.title} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{asset.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{asset.desc}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{asset.size} · {asset.ext}</p>
                  <button
                    type="button"
                    className="mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-background text-xs font-medium transition-colors hover:bg-accent"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">Quick facts</h2>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FACTS.map((fact) => (
              <div key={fact.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{fact.label}</p>
                <p className="mt-1 text-sm font-semibold">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">Boilerplate</h2>

          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{BOILERPLATE}</p>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Copy this text into your article. No attribution required but appreciated.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <MessageSquare className="mx-auto h-10 w-10 text-white/90" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Need an interview?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/90">
            We&apos;re happy to talk about bilingual publishing, indie building, and calm technology.
          </p>
          <a
            href="mailto:press@daccasolution.com"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-amber-700 hover:bg-zinc-50"
          >
            <Mail className="h-4 w-4" />
            press@daccasolution.com
          </a>
        </div>
      </section>
    </div>
  );
}