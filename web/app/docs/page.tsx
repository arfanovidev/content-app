'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  Code2,
  Rocket,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface DocItem {
  id: number;
  title: string;
  href?: string;
  status: 'ready' | 'coming-soon';
}

interface DocGroup {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  items: DocItem[];
}

const GROUPS: DocGroup[] = [
  {
    icon: FileText,
    title: 'Project Documentation',
    description: 'Proposal, requirements, design, testing, and reports',
    color: 'from-indigo-500 to-purple-600',
    items: [
      { id: 1, title: 'Project Proposal', href: '/docs/project-proposal', status: 'ready' },
      { id: 2, title: 'Software Requirements Specification (SRS)', status: 'coming-soon' },
      { id: 3, title: 'Software Requirements Analysis', status: 'coming-soon' },
      { id: 4, title: 'System Architecture Document', status: 'coming-soon' },
      { id: 5, title: 'System Design Document (SDD)', status: 'coming-soon' },
      { id: 6, title: 'Use Case Diagram', status: 'coming-soon' },
      { id: 7, title: 'UML Diagrams (Class, Sequence, Activity)', status: 'coming-soon' },
      { id: 8, title: 'ER Diagram', status: 'coming-soon' },
      { id: 9, title: 'Database Design Document', status: 'coming-soon' },
      { id: 10, title: 'UI/UX Design', status: 'coming-soon' },
      { id: 11, title: 'API Documentation', status: 'coming-soon' },
      { id: 12, title: 'Software Test Plan', status: 'coming-soon' },
      { id: 13, title: 'Test Cases & Test Report', status: 'coming-soon' },
      { id: 14, title: 'User Manual', status: 'coming-soon' },
      { id: 15, title: 'Installation & Deployment Guide', status: 'coming-soon' },
      { id: 16, title: 'Final Project Report', status: 'coming-soon' },
      { id: 17, title: 'Presentation Slides (PPT)', status: 'coming-soon' },
    ],
  },
  {
    icon: Code2,
    title: 'Software Source Code',
    description: 'Frontend, backend, tests, and configuration',
    color: 'from-emerald-500 to-teal-600',
    items: [
      { id: 18, title: 'Frontend Source Code', status: 'coming-soon' },
      { id: 19, title: 'Backend Source Code', status: 'coming-soon' },
      { id: 20, title: 'Database Schema & Migration Files', status: 'coming-soon' },
      { id: 21, title: 'API / Integration Code', status: 'coming-soon' },
      { id: 22, title: 'Authentication & Authorization Code', status: 'coming-soon' },
      { id: 23, title: 'Configuration Files (.env.example)', status: 'coming-soon' },
      { id: 24, title: 'Dependency Files (package.json)', status: 'coming-soon' },
      { id: 25, title: 'Automated Test Files', status: 'coming-soon' },
      { id: 26, title: 'README.md', status: 'coming-soon' },
      { id: 27, title: '.gitignore', status: 'coming-soon' },
    ],
  },
  {
    icon: Rocket,
    title: 'Deployment & Maintenance',
    description: 'Docker, CI/CD, security, and ops',
    color: 'from-amber-500 to-orange-600',
    items: [
      { id: 28, title: 'Dockerfile', status: 'coming-soon' },
      { id: 29, title: 'Docker Compose File', status: 'coming-soon' },
      { id: 30, title: 'CI/CD Configuration', status: 'coming-soon' },
      { id: 31, title: 'Logging & Error Handling', status: 'coming-soon' },
      { id: 32, title: 'Security Configuration', status: 'coming-soon' },
      { id: 33, title: 'Backup & Recovery Guide', status: 'coming-soon' },
      { id: 34, title: 'Maintenance Documentation', status: 'coming-soon' },
    ],
  },
];

export default function DocsPage() {
  const totalDocs = GROUPS.reduce((sum, g) => sum + g.items.length, 0);
  const readyDocs = GROUPS.reduce(
    (sum, g) => sum + g.items.filter((i) => i.status === 'ready').length,
    0
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300">
              <FileText className="h-3.5 w-3.5" />
              Software Engineering Artifacts
            </div>

            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Project{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Complete set of software engineering artifacts — from proposal and
              requirements through design, testing, deployment, and maintenance.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {readyDocs} ready
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                <Clock className="h-3.5 w-3.5" />
                {totalDocs - readyDocs} coming soon
              </span>
              <span className="text-xs text-muted-foreground">
                Total: {totalDocs} documents
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Groups */}
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-12">
          {GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <section key={group.title}>
                <div className="mb-6 flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${group.color} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                      {group.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  {group.items.map((item) => {
                    const isReady = item.status === 'ready';
                    const content = (
                      <div className="flex items-center gap-4 border-b border-border px-4 py-3 transition-colors last:border-b-0 hover:bg-accent">
                        <span className="shrink-0 text-xs font-mono text-muted-foreground">
                          {String(item.id).padStart(2, '0')}
                        </span>
                        <span
                          className={`flex-1 text-sm font-medium ${isReady ? 'text-foreground' : 'text-muted-foreground'}`}
                        >
                          {item.title}
                        </span>
                        {isReady ? (
                          <>
                            <span className="hidden rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 sm:inline">
                              Ready
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </>
                        ) : (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            Soon
                          </span>
                        )}
                      </div>
                    );

                    return isReady && item.href ? (
                      <Link key={item.id} href={item.href}>
                        {content}
                      </Link>
                    ) : (
                      <div key={item.id}>{content}</div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}