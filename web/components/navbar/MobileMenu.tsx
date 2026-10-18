'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { key: 'home', href: '/' },
  { key: 'favorites', href: '/favorites' },
  { key: 'blog', href: '/blog' },
  { key: 'about', href: '/about' },
  { key: 'donate', href: '/donate' },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');

  // Only render portal on the client
  useEffect(() => { setMounted(true); }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  if (!mounted) return null;

  // Hamburger button — stays in the navbar
  const hamburger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={t('openMenu')}
      aria-expanded={open}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-all duration-200 hover:bg-accent active:scale-95 md:hidden"
    >
      <Menu className="h-5 w-5" strokeWidth={2.25} />
    </button>
  );

  // Drawer + backdrop — rendered in a portal at document.body
  const drawerContent = (
    <>
      {/* Backdrop — fades in */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer — full screen height, slides from right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t('menu')}
        className={`fixed inset-y-0 right-0 z-[101] flex h-screen h-[100dvh] w-80 max-w-[88vw] flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <span className="text-base font-semibold tracking-tight">
            {t('menu')}
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t('closeMenu')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-all duration-200 hover:bg-accent active:scale-95"
          >
            <X className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto overscroll-contain p-3">
          <ul className="space-y-1">
            {LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
                      active
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-border p-5">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
            Content App
          </p>
        </div>
      </aside>
    </>
  );

  return (
    <>
      {hamburger}
      {createPortal(drawerContent, document.body)}
    </>
  );
}