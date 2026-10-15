'use client';

import { Logo } from './Logo';
import { DarkModeToggle } from './DarkModeToggle';
import { LangToggle } from './LangToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex items-center gap-1 sm:gap-2">
          <LangToggle />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
