'use client';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Link href="/docs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />All documents
        </Link>
        <div className="mt-8 rounded-xl border border-border bg-card p-8">
          <FileText className="h-8 w-8 text-indigo-600" />
          <h1 className="mt-3 text-2xl font-bold">Project Proposal</h1>
          <p className="mt-2 text-muted-foreground">
            Part 1 (sections 1–15) will be added in a follow-up step.
            Part 2 is already available at{' '}
            <Link href="/docs/project-proposal/part-2" className="text-indigo-600 underline">
              /docs/project-proposal/part-2
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
