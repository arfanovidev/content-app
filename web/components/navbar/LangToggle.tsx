'use client';

import { Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/langStore';

export function LangToggle() {
  const { lang, toggle } = useLangStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" disabled>
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
      className="gap-1"
    >
      <Languages className="h-5 w-5" />
      <span className="font-medium">{lang === 'en' ? 'EN' : 'বাং'}</span>
    </Button>
  );
}
