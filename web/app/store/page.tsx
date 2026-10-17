'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Coffee, Shirt, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

const PRODUCTS = [
  { icon: Coffee, name: 'Ceramic mug', price: '৳850', desc: 'Simple matte black mug for slow mornings.' },
  { icon: Shirt, name: 'T-shirt', price: '৳1,200', desc: '100% cotton, minimal logo on chest.' },
  { icon: BookOpen, name: 'Notebook', price: '৳600', desc: '160 pages, dot grid, perfect for notes.' },
];

export default function StorePage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-teal-950/30 dark:via-zinc-950 dark:to-cyan-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-teal-500" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Store</span>
            </h1>
          </div>

          <p className="mt-3 max-w-lg text-base text-muted-foreground">
            Small items for people who love reading. Every purchase supports the project.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-3 py-1 text-xs font-medium text-teal-700 dark:border-teal-900 dark:bg-zinc-900/80 dark:text-teal-300">
            <Sparkles className="h-3.5 w-3.5" />
            Launching soon — join the waitlist
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">Coming soon</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PRODUCTS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.name} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  <p className="mt-3 text-lg font-bold">{p.price}</p>
                  <button
                    type="button"
                    className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-lg border border-border text-xs font-medium text-muted-foreground"
                    disabled
                  >
                    Notify me
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <ShoppingBag className="mx-auto h-10 w-10 text-white/90" />
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Want to be notified?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/90">
            Email us and we&apos;ll let you know when the store opens.
          </p>
          <a
            href="mailto:store@daccasolution.com?subject=Notify me about the store"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-teal-700 hover:bg-zinc-50"
          >
            Notify me
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}