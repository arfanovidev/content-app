'use client';

import { Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/langStore';

export function LangToggle() {
  const lang = useLangStore((s) => s.lang);
  const toggle = useLangStore((s) => s.toggle);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" disabled aria-label="Toggle language">
        <Languages className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label="Toggle language"
      className="h-9 gap-1.5 rounded-lg px-2.5 hover:bg-accent"
    >
      <Languages className="h-4 w-4" strokeWidth={2} />
      <span className="text-xs font-semibold tracking-wide">
        {lang === 'en' ? 'EN' : 'বাং'}
      </span>
    </Button>
  );
}
