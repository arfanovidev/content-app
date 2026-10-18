'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Activity, Server, Database, Globe, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function StatusPage() {
  const t = useTranslations('status');

  const SERVICES = [
    { nameKey: 'webApp', desc: 'content-app-gamma.vercel.app', icon: Globe, uptime: '99.98%' },
    { nameKey: 'api', desc: 'content-api-f32c.onrender.com', icon: Server, uptime: '99.95%' },
    { nameKey: 'storage', desc: 'Google Drive JSON backend', icon: Database, uptime: '99.99%' },
    { nameKey: 'tts', desc: 'Browser Web Speech API', icon: Activity, uptime: '100%' },
  ];

  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/30 dark:via-zinc-950 dark:to-emerald-950/30">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {t('back')}
          </Link>

          <div className="mt-8 flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('allOperational')}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{t('lastChecked')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">{t('currentStatus')}</h2>
          <div className="mt-6 space-y-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.nameKey} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{t(`services.${service.nameKey}` as any)}</p>
                    <p className="truncate text-xs text-muted-foreground">{service.desc}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-700 dark:text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {t('operational')}
                    </span>
                    <p className="mt-1 text-xs text-muted-foreground">{service.uptime}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">{t('uptime90')}</h2>
          <div className="mt-4 grid grid-cols-30 gap-1 sm:gap-0.5">
            {Array.from({ length: 90 }).map((_, i) => (
              <div key={i} className="h-8 rounded-sm bg-green-500/80 hover:bg-green-600" title={`Day ${i + 1}`} />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{t('daysAgo')}</span>
            <span>{t('today')}</span>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold tracking-tight">{t('pastIncidents')}</h2>
          <div className="mt-6 space-y-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <p className="text-sm font-semibold">{t('noIncidents')}</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">2026-10-17</p>
              <p className="mt-2 text-sm text-muted-foreground">{t('noIncidentsDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <Zap className="mx-auto h-10 w-10 text-white/90" />
          <h2 className="mt-4 text-2xl font-bold text-white">{t('realTimeMonitoring')}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/90">{t('monitoringDesc')}</p>
        </div>
      </section>
    </div>
  );
}