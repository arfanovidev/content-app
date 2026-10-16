'use client';

import { Logo } from './Logo';
import { DarkModeToggle } from './DarkModeToggle';
import { LangToggle } from './LangToggle';
import { FavoritesLink } from './FavoritesLink';
import { WeatherWidget } from './WeatherWidget';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Logo />

        <div className="flex items-center gap-0.5 sm:gap-1">
          <WeatherWidget />
          <FavoritesLink />
          <LangToggle />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}