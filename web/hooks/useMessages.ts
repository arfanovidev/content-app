'use client';

import { useLangStore } from '@/store/langStore';
import en from '@/messages/en.json';
import bn from '@/messages/bn.json';

type Messages = typeof en;

const messages: Record<'en' | 'bn', Messages> = { en, bn: bn as Messages };

export function useMessages(): Messages {
  const lang = useLangStore((s) => s.lang);
  return messages[lang] ?? messages.en;
}
