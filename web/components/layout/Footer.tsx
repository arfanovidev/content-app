'use client';

import Link from 'next/link';
import { GravityAnimation } from './GravityAnimation';
import { ScienceWordAnimation } from './ScienceWordAnimation';

const LINKS = [
  { label: 'Help', href: '/help' },
  { label: 'Status', href: '/status' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Press', href: '/press' },
  { label: 'Blog', href: '/blog' },
  { label: 'Store', href: '/store' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Rules', href: '/rules' },
  { label: 'Terms', href: '/terms' },
  { label: 'Text to speech', href: '/text-to-speech' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Top row: Left animation | Links | Right animation */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Gravity animation */}
          <div className="shrink-0">
            <GravityAnimation />
          </div>

          {/* Center: Footer links */}
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-foreground hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Science + Word animation */}
          <div className="shrink-0">
            <ScienceWordAnimation />
          </div>
        </div>

        {/* Bottom row: unique brand mark (left-aligned) */}
        <div className="mt-6 flex items-end justify-between gap-4">
          <a
            href="https://daccainnovation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2"
          >
            {/* Accent dot */}
            <span className="flex h-4 w-4 items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 transition-transform group-hover:scale-125" />
            </span>

            {/* Brand mark — two-line stacked, tiny */}
            <span className="flex flex-col leading-none">
              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                Dacca
              </span>
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.15em] bg-gradient-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-rose-400">
                Innovation
              </span>
            </span>
          </a>

          {/* Right side: subtle text */}
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}