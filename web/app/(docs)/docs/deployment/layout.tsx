import type { Metadata } from 'next';
import { docMetadata } from '@/lib/doc-metadata';

export const metadata: Metadata = docMetadata(
  'Installation & Deployment Guide',
  'Deploy Content App to Vercel (frontend) and Render (backend) with environment variables.',
  '/docs/deployment'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}