'use client';

import Link from 'next/link';
import { ArrowLeft, Rss, ArrowRight, Calendar } from 'lucide-react';

const POSTS = [
  {
    slug: 'why-no-ads',
    title: 'Why we built Content App without ads',
    excerpt: 'The web is full of noise. Here\'s our thinking behind an ad-free reading platform.',
    date: '2026-10-15',
    category: 'Design',
    readTime: 5,
  },
  {
    slug: 'bilingual-ux',
    title: 'Designing for bilingual readers',
    excerpt: 'How we handled English and বাংলা side-by-side — without auto-translation or awkward layouts.',
    date: '2026-10-10',
    category: 'Engineering',
    readTime: 7,
  },
  {
    slug: 'tts-web-speech',
    title: 'Text-to-speech without an API bill',
    excerpt: 'How the Web Speech API lets us read articles aloud in two languages — for free.',
    date: '2026-10-05',
    category: 'Engineering',
    readTime: 6,
  },
  {
    slug: 'small-team-shipping',
    title: 'What we learned shipping with a tiny team',
    excerpt: 'Priorities, trade-offs, and the things we said no to.',
    date: '2026-09-28',
    category: 'Team',
    readTime: 4,
  },
  {
    slug: 'google-drive-as-db',
    title: 'Using Google Drive as a database (really)',
    excerpt: 'Why we chose a simple JSON-on-Drive backend for a small content platform.',
    date: '2026-09-20',
    category: 'Engineering',
    readTime: 8,
  },
  {
    slug: 'reading-metrics',
    title: 'Reading metrics that actually matter',
    excerpt: 'Percentages, streaks, and why we skip "time on site".',
    date: '2026-09-12',
    category: 'Product',
    readTime: 5,
  },
];

const CATEGORIES = ['All', 'Design', 'Engineering', 'Product', 'Team'];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-pink-950/30 dark:via-zinc-950 dark:to-purple-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <Rss className="h-8 w-8 text-pink-500" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">The Blog</span>
            </h1>
          </div>

          <p className="mt-3 max-w-lg text-base text-muted-foreground">
            Notes on building, writing, and thinking clearly about content on the web.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  cat === 'All'
                    ? 'border-pink-500 bg-pink-500 text-white'
                    : 'border-border bg-background text-muted-foreground hover:bg-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {POSTS.map((post) => (
              <article
                key={post.slug}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-pink-300 hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-pink-500/10 px-2 py-0.5 font-medium text-pink-600 dark:text-pink-400">
                    {post.category}
                  </span>
                  <span className="text-muted-foreground">{post.readTime} min read</span>
                </div>

                <h2 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-pink-600 dark:group-hover:text-pink-400">
                  {post.title}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}