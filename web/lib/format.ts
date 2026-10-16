import type { BilingualText } from '@/types';

/**
 * Language-aware text picker with fallback.
 * - lang = 'bn' → prefer bn, fallback en
 * - lang = 'en' → prefer en, fallback bn
 * - Never returns empty if ANY language has value
 */
export function pickText(
  field: BilingualText | null | undefined,
  lang: 'en' | 'bn'
): string {
  if (!field) return '';
  if (lang === 'bn') return (field.bn || field.en || '').trim();
  return (field.en || field.bn || '').trim();
}

export function formatDate(iso: string, lang: 'en' | 'bn'): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function readTimeLabel(minutes: number, lang: 'en' | 'bn'): string {
  if (!minutes || minutes < 1) {
    const seconds = Math.max(1, Math.round((minutes || 0) * 60));
    return lang === 'bn' ? `${seconds} সেকেন্ড` : `${seconds} sec`;
  }
  const rounded = Math.round(minutes);
  return lang === 'bn' ? `${rounded} মিনিট` : `${rounded} min`;
}

export function normalizeImageUrl(
  url: string | null | undefined
): string | undefined {
  if (!url) return undefined;

  const ucMatch = url.match(
    /drive\.google\.com\/uc\?(?:export=view&)?id=([^&]+)/
  );
  if (ucMatch) return `https://lh3.googleusercontent.com/d/${ucMatch[1]}`;

  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (fileMatch) return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;

  return url;
}