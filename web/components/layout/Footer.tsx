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

        {/* Bottom row: developer credit */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Developed by{' '}
          <a
            href="https://daccasolution.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            Dacca Solution
          </a>
        </p>
      </div>
    </footer>
  );
}