'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Coffee, Shirt, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function StorePage() {
  const t = useTranslations('store');

  const PRODUCTS = [
    { icon: Coffee, nameKey: 'mugName', descKey: 'mugDesc', price: '৳850' },
    { icon: Shirt, nameKey: 'tshirtName', descKey: 'tshirtDesc', price: '৳1,200' },
    { icon: BookOpen, nameKey: 'notebookName', descKey: 'notebookDesc', price: '৳600' },
  ];

  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-teal-950/30 dark:via-zinc-950 dark:to-cyan-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </Link>

          <div className="mt-8">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-10 w-10 text-teal-500" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  {t('title')}
                </span>
              </h1>
            </div>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              {t('subtitle')}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:border-teal-900 dark:bg-teal-950/30 dark:text-teal-300">
              <Sparkles className="h-3.5 w-3.5" />
              {t('comingSoon')}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PRODUCTS.map((product) => {
              const Icon = product.icon;
              return (
                <div key={product.nameKey} className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-md">
                  <Icon className="mx-auto h-8 w-8 text-teal-500" />
                  <h3 className="mt-3 text-base font-semibold">{t(`products.${product.nameKey}` as any)}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{t(`products.${product.descKey}` as any)}</p>
                  <p className="mt-3 text-lg font-bold text-teal-600">{product.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <ShoppingBag className="mx-auto h-10 w-10 text-white/90" />
          <h2 className="mt-4 text-2xl font-bold text-white">{t('ctaTitle')}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/90">{t('ctaSubtitle')}</p>
          <Link href="/contact" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-teal-700 hover:bg-zinc-50">
            {t('ctaButton')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}