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
  // Less than 1 min → show seconds
  if (minutes < 1) {
    const seconds = Math.round(minutes * 60);
    return lang === 'bn' ? `${seconds} সেকেন্ড` : `${seconds} sec`;
  }

  const rounded = Math.round(minutes);
  return lang === 'bn' ? `${rounded} মিনিট` : `${rounded} min`;
}