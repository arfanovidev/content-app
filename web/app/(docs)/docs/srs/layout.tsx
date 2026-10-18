import type { Metadata } from 'next';
import { docMetadata } from '@/lib/doc-metadata';

export const metadata: Metadata = docMetadata(
  'Software Requirements Specification (SRS)',
  'Detailed functional and non-functional requirements for Content App — FR-001 to FR-015, NFR-001 to NFR-010, business rules, and constraints.',
  '/docs/srs'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}