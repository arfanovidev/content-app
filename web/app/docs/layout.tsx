import type { Metadata } from 'next';
import { docMetadata } from '@/lib/doc-metadata';
import './docs-vintage.css';

export const metadata: Metadata = docMetadata(
  'Project Documentation',
  'Complete software engineering artifacts for Content App â‚¬" proposal, SRS, architecture, API, test plan, user manual, deployment.',
  '/docs'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="vintage-docs min-h-screen">{children}</div>;
}