import type { Metadata } from 'next';
import { docMetadata } from '@/lib/doc-metadata';

export const metadata: Metadata = docMetadata(
  'User Manual',
  'Step-by-step guide for readers and administrators — signup, reading, audio, admin CRUD.',
  '/docs/user-manual'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}