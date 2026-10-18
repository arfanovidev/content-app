'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LayoutDashboard, LogOut, ChevronDown, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('profile');

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [open]);

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

  if (!user) return null;

  const initials = user.username.slice(0, 2).toUpperCase();
  const isAdmin = user.username === 'admin';
  const dashboardUrl = isAdmin ? '/admin' : '/user';

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-full pl-1 pr-2 transition-all duration-200 hover:bg-accent active:scale-95"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 text-xs font-bold text-white shadow-sm ring-2 ring-background">
          {initials}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <>
          {/* Backdrop for mobile — invisible on desktop */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Dropdown panel */}
          <div
            role="menu"
            className="absolute right-0 top-12 z-50 w-64 origin-top-right animate-scale-in overflow-hidden rounded-2xl border border-border/80 bg-popover shadow-xl"
          >
            {/* User info header */}
            <div className="border-b border-border bg-muted/30 px-4 py-3.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                {t('signedInAs')}
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-foreground">
                {user.username}
              </p>
              {user.email && (
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>

            {/* Menu items */}
            <div className="p-1.5">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-accent"
              >
                <User className="h-4 w-4 text-muted-foreground" />
                {t('profile')}
              </Link>

              <Link
                href={dashboardUrl}
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-accent"
              >
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                {isAdmin ? t('adminPanel') : t('myDashboard')}
              </Link>

              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-accent"
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                {t('settings')}
              </Link>
            </div>

            {/* Sign out — separated */}
            <div className="border-t border-border p-1.5">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                role="menuitem"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-destructive transition-colors duration-150 hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                {t('signOut')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}