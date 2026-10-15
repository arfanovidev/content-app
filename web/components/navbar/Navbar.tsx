'use client';

import { Logo } from './Logo';
import { DarkModeToggle } from './DarkModeToggle';
import { LangToggle } from './LangToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        <div className="flex items-center gap-1">
          <LangToggle />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
