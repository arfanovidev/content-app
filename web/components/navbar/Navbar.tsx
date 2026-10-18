'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { Logo } from './Logo';
import { DarkModeToggle } from './DarkModeToggle';
import { LangToggle } from './LangToggle';
import { FavoritesLink } from './FavoritesLink';
import { WeatherWidget } from './WeatherWidget';
import { ProfileMenu } from './ProfileMenu';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from '@/components/locale/LanguageSwitcher';

const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'favorites', href: '/favorites' },
  { key: 'blog', href: '/blog' },
  { key: 'about', href: '/about' },
  { key: 'donate', href: '/donate' },
];

export function Navbar() {
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const openSignup = useAuthStore((s) => s.openSignup);
  const pathname = usePathname();
  const t = useTranslations('nav');

  const showLangToggle = pathname?.startsWith('/content/');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-3 sm:h-24 sm:gap-3 sm:px-4 md:px-6 lg:gap-4 lg:px-8">
        {/* LEFT: Logo + desktop nav */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          <Logo />

          <nav className="hidden min-w-0 items-center gap-0.5 md:flex md:gap-1">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`relative whitespace-nowrap rounded-lg px-2 py-1.5 text-sm font-medium transition-colors duration-150 lg:px-3 lg:py-2 ${
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1 md:gap-1.5">
          {/* Weather — only xl+ (big desktop), because it needs room */}
          <div className="hidden xl:flex xl:items-center xl:gap-1">
            <WeatherWidget />
          </div>

          {/* Favorites — only md+ and authed */}
          {isAuth && (
            <div className="hidden md:flex">
              <FavoritesLink />
            </div>
          )}

          {/* Lang toggle — only on content pages, only sm+ */}
          {showLangToggle && (
            <div className="hidden sm:flex">
              <LangToggle />
            </div>
          )}

          {/* Language switcher — always, but compact on mobile */}
          <LanguageSwitcher />
          <DarkModeToggle />

          {/* Signup button — only sm+ for guests */}
          {!isAuth && (
            <button
              type="button"
              onClick={openSignup}
              className="ml-1 hidden h-9 items-center rounded-full bg-primary px-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:bg-primary/90 hover:shadow-md active:scale-95 sm:inline-flex lg:px-4"
            >
              {t('signUp')}
            </button>
          )}

          {/* Profile menu — authed only, all sizes */}
          {isAuth && <ProfileMenu />}

          {/* Mobile hamburger — below md */}
          <div className="flex md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}