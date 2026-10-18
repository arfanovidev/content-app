import type { Metadata } from 'next';
import { docMetadata } from '@/lib/doc-metadata';

export const metadata: Metadata = docMetadata(
  'System Architecture Document',
  'Two-tier architecture with Next.js frontend, NestJS backend, and Google Drive storage. Includes component diagrams.',
  '/docs/architecture'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}