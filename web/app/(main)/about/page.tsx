'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about.simple');

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {t('eyebrow')}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {t('intro')}
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">{t('whyTitle')}</h2>
        <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>{t('whyP1')}</p>
          <p>{t('whyP2')}</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">{t('whatTitle')}</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground sm:text-base">
          <li>• {t('what1')}</li>
          <li>• {t('what2')}</li>
          <li>• {t('what3')}</li>
          <li>• {t('what4')}</li>
          <li>• {t('what5')}</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">{t('principlesTitle')}</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground sm:text-base">
          <li>• <strong className="text-foreground">{t('principleFreeTitle')}</strong> — {t('principleFree')}</li>
          <li>• <strong className="text-foreground">{t('principlePrivateTitle')}</strong> — {t('principlePrivate')}</li>
          <li>• <strong className="text-foreground">{t('principleBilingualTitle')}</strong> — {t('principleBilingual')}</li>
          <li>• <strong className="text-foreground">{t('principleAccessibleTitle')}</strong> — {t('principleAccessible')}</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">{t('whoTitle')}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t('whoText')}
        </p>
      </section>

      <hr className="my-14 border-border" />

      <footer>
        <h2 className="text-sm font-semibold">{t('contactTitle')}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t('contactText')}
        </p>
        <a
          href="mailto:hello@contentapp.dev"
          className="mt-3 inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:no-underline"
        >
          hello@contentapp.dev
        </a>
      </footer>
    </div>
  );
}