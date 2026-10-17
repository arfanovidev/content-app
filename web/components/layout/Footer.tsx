'use client';

import Link from 'next/link';

const LINKS = [
  'Help',
  'Status',
  'About',
  'Careers',
  'Press',
  'Blog',
  'Store',
  'Privacy',
  'Rules',
  'Terms',
  'Text to speech',
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {LINKS.map((label) => (
            <li key={label}>
              <Link href="#" className="transition-colors hover:text-foreground hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-muted-foreground">
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