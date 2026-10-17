'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Logo } from './Logo';
import { DarkModeToggle } from './DarkModeToggle';
import { LangToggle } from './LangToggle';
import { FavoritesLink } from './FavoritesLink';
import { WeatherWidget } from './WeatherWidget';
import { ProfileMenu } from './ProfileMenu';

export function Navbar() {
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const openSignup = useAuthStore((s) => s.openSignup);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <div className="flex items-center gap-4">
          <Logo />
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/favorites" className="text-muted-foreground transition-colors hover:text-foreground">
            Stories
          </Link>
          <Link href="/donate" className="text-muted-foreground transition-colors hover:text-foreground">
            Donate
          </Link>
          <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
            Our Story
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <WeatherWidget />
          {isAuth && <FavoritesLink />}
          <LangToggle />
          <DarkModeToggle />
          {isAuth ? (
            <ProfileMenu />
          ) : (
            <button
              type="button"
              onClick={openSignup}
              className="hidden h-9 items-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 sm:inline-flex"
            >
              Sign up
            </button>
          )}
        </div>
      </div>
    </header>
  );
}