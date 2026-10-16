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
    (set) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
      // ✅ Functional update — strict-mode safe
      toggle: () =>
        set((state) => ({ lang: state.lang === 'en' ? 'bn' : 'en' })),
    }),
    { name: 'lang-store' },
  ),
);