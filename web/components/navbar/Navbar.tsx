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
  { key: 'blog', href: '/donate' },
  { key: 'about', href: '/about' },
];

export function Navbar() {
  const isAuth = useAuthStore((s) => s.isAuthenticated());
  const openSignup = useAuthStore((s) => s.openSignup);
  const pathname = usePathname();
  const t = useTranslations('nav');

  const showLangToggle = pathname?.startsWith('/content/');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
        {/* LEFT: Logo + desktop nav */}
        <div className="flex min-w-0 items-center gap-6 sm:gap-8">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                  }`}
                >
                  {t(link.key)}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT: Action icons */}
        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          {/* Desktop-only icons */}
          <div className="hidden items-center gap-1 md:flex">
            <WeatherWidget />
            {isAuth && <FavoritesLink />}
          </div>

          {/* Always-visible icons (mobile + desktop) */}
          {showLangToggle && <LangToggle />}
          <LanguageSwitcher />
          <DarkModeToggle />

          {isAuth ? (
            <ProfileMenu />
          ) : (
            <button
              type="button"
              onClick={openSignup}
              className="ml-1 hidden h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:bg-primary/90 hover:shadow-md active:scale-95 sm:inline-flex"
            >
              {t('signUp')}
            </button>
          )}

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}