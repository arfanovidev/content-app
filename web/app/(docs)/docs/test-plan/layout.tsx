import type { Metadata } from 'next';
import { docMetadata } from '@/lib/doc-metadata';

export const metadata: Metadata = docMetadata(
  'Software Test Plan',
  'Test strategy, levels, environment, and pass/fail criteria for Content App.',
  '/docs/test-plan'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}