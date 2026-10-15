import type { BilingualText } from '@/types';

export function pickText(field: BilingualText, lang: 'en' | 'bn'): string {
  return field[lang] || field.en || '';
}

export function formatDate(iso: string, lang: 'en' | 'bn'): string {
  const date = new Date(iso);
  return date.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function readTimeLabel(minutes: number, lang: 'en' | 'bn'): string {
  return lang === 'bn' ? `${minutes} মিনিট` : `${minutes} min`;
}
