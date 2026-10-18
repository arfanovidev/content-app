'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const ROLES = [
  { key: 'fullstack', type: 'fullTime', dept: 'engineering' },
  { key: 'writerBn', type: 'partTime', dept: 'content' },
  { key: 'writerEn', type: 'partTime', dept: 'content' },
];

export default function CareersPage() {
  const t = useTranslations('careers');

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {t('eyebrow')}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t('subtitle')}
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t('whyTitle')}
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>• {t('why1')}</li>
          <li>• {t('why2')}</li>
          <li>• {t('why3')}</li>
          <li>• {t('why4')}</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t('openRoles')} ({ROLES.length})
        </h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {ROLES.map((role) => (
            <a
              key={role.key}
              href={`mailto:careers@daccasolution.com?subject=Application: ${t(`roles.${role.key}.title`)}`}
              className="group block py-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t(`departments.${role.dept}`)}
                  </p>
                  <h3 className="mt-1 text-base font-semibold">
                    {t(`roles.${role.key}.title`)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {t(`roles.${role.key}.description`)}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t(`types.${role.type}`)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {t('remote')}
                    </span>
                  </div>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t('noFitTitle')}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t('noFitText')}
        </p>
        <a
          href="mailto:careers@daccasolution.com"
          className="mt-4 inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent"
        >
          careers@daccasolution.com
        </a>
      </section>

      <footer className="mt-12 text-xs leading-relaxed text-muted-foreground">
        {t('footer')}
      </footer>
    </article>
  );
}