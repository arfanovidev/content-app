'use client';

import Link from 'next/link';
import { ArrowLeft, ScrollText, Heart, MessageCircle, ShieldCheck, Ban } from 'lucide-react';

const RULES = [
  {
    icon: Heart,
    title: 'Be kind',
    desc: 'Assume good faith. Disagree with ideas, never attack people. Slurs and personal attacks are not allowed.',
  },
  {
    icon: MessageCircle,
    title: 'Add value',
    desc: 'Comments should add something — a question, a counterpoint, a useful link. "First!" or spam will be removed.',
  },
  {
    icon: ShieldCheck,
    title: 'Respect privacy',
    desc: 'Don\'t share someone else\'s personal info, private messages, or photos without consent.',
  },
  {
    icon: Ban,
    title: 'No illegal content',
    desc: 'No copyrighted material you don\'t own, no adult content, no encouragement of violence or harm.',
  },
  {
    icon: ScrollText,
    title: 'One account',
    desc: 'Don\'t create multiple accounts to evade moderation or manipulate votes.',
  },
];

export default function RulesPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-gradient-to-br from-lime-50 via-white to-emerald-50 dark:from-lime-950/30 dark:via-zinc-950 dark:to-emerald-950/30">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <ScrollText className="h-8 w-8 text-lime-600 dark:text-lime-400" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Community Rules</h1>
          </div>

          <p className="mt-3 max-w-lg text-base text-muted-foreground">
            Five simple rules that keep this a good place to read.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <div className="space-y-4">
            {RULES.map((rule, idx) => {
              const Icon = rule.icon;
              return (
                <div key={rule.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-lime-500/10 text-lime-600 dark:text-lime-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{idx + 1}.</span>
                      <h2 className="text-base font-semibold">{rule.title}</h2>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{rule.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl border border-lime-200 bg-lime-50 p-5 dark:border-lime-900 dark:bg-lime-950/30">
            <h2 className="text-sm font-semibold">Enforcement</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Violations are handled case-by-case. Minor issues may result in a warning; repeat offenses can lead to account suspension. Report problems to{' '}
              <a href="mailto:abuse@daccasolution.com" className="font-medium text-foreground underline">abuse@daccasolution.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}