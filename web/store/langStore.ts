import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Lang = 'en' | 'bn';

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set, get) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
      toggle: () => set({ lang: get().lang === 'en' ? 'bn' : 'en' }),
    }),
    { name: 'lang-store' },
  ),
);
