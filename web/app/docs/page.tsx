'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowLeft, FileText, Code2, Rocket, ArrowRight,
  CheckCircle2, Clock, Activity, Database, Server, Zap,
} from 'lucide-react';

interface DocItem {
  id: number;
  title: string;
  description: string;
  href?: string;
  status: 'ready' | 'coming-soon';
}

interface DocGroup {
  icon: React.ElementType;
  title: string;
  description: string;
  items: DocItem[];
}

const GROUPS: DocGroup[] = [
  {
    icon: FileText,
    title: 'Project Documentation',
    description: 'Formal software engineering artifacts Ã¢â‚¬" from requirements to final report.',
    items: [
      { id: 1, title: 'Project Proposal', description: 'Complete academic proposal with 29 sections: abstract, problem statement, objectives, requirements, architecture, timeline, and references.', href: '/docs/project-proposal', status: 'ready' },
      { id: 2, title: 'Software Requirements Specification (SRS)', description: 'Detailed functional and non-functional requirements with unique IDs (FR-001 to FR-015, NFR-001 to NFR-010) and traceability.', href: '/docs/srs', status: 'ready' },
      { id: 3, title: 'Software Requirements Analysis', description: 'Analysis of requirements using use cases, stakeholder interviews, and requirement prioritization.', status: 'coming-soon' },
      { id: 4, title: 'System Architecture Document', description: 'Two-tier architecture with Next.js frontend, NestJS backend, and Google Drive storage. Includes component diagrams.', href: '/docs/architecture', status: 'ready' },
      { id: 5, title: 'System Design Document (SDD)', description: 'Module-level design, class diagrams, sequence diagrams, and interface specifications.', status: 'coming-soon' },
      { id: 6, title: 'Use Case Diagram', description: 'UML use case diagram showing actor interactions across 12 core use cases.', status: 'coming-soon' },
      { id: 7, title: 'UML Diagrams (Class, Sequence, Activity)', description: 'Comprehensive UML suite: class diagrams, sequence diagrams, activity diagrams.', status: 'coming-soon' },
      { id: 8, title: 'ER Diagram', description: 'Entity-relationship diagram showing 5 entities and their relationships.', status: 'coming-soon' },
      { id: 9, title: 'Database Design Document', description: 'JSON-based storage schema, field specifications, and validation rules for all storage files.', status: 'coming-soon' },
      { id: 10, title: 'UI/UX Design', description: 'Design system, wireframes, color palette, typography, responsive breakpoints.', status: 'coming-soon' },
      { id: 11, title: 'API Documentation', description: 'Interactive Swagger UI + reference for all REST endpoints with request/response examples.', href: 'https://content-api-f32c.onrender.com/api/docs', status: 'ready' },
      { id: 12, title: 'Software Test Plan', description: 'Test strategy, levels (unit/integration/e2e), coverage targets, and environment configuration.', href: '/docs/test-plan', status: 'ready' },
      { id: 13, title: 'Test Cases & Test Report', description: '50+ manual test cases with pass/fail status and coverage reports.', status: 'coming-soon' },
      { id: 14, title: 'User Manual', description: 'Step-by-step guide for readers and administrators Ã¢â‚¬" signup, reading, audio, admin CRUD.', href: '/docs/user-manual', status: 'ready' },
      { id: 15, title: 'Installation & Deployment Guide', description: 'Complete deployment instructions for Vercel and Render with environment variables.', href: '/docs/deployment', status: 'ready' },
      { id: 16, title: 'Final Project Report', description: 'Consolidated report covering requirements, design, implementation, testing, lessons learned.', status: 'coming-soon' },
      { id: 17, title: 'Presentation Slides (PPT)', description: 'Project defense presentation: problem, solution, architecture, demo, results.', status: 'coming-soon' },
    ],
  },
  {
    icon: Code2,
    title: 'Software Source Code',
    description: 'All source code artifacts hosted on GitHub with MIT license.',
    items: [
      { id: 18, title: 'Frontend Source Code', description: 'Next.js app with 25+ routes, Zustand stores, React Query hooks, Tailwind v4.', href: 'https://github.com/arfanovidev/content-app/tree/main/web', status: 'ready' },
      { id: 19, title: 'Backend Source Code', description: 'NestJS REST API with 8 modules: auth, contents, categories, completed, votes, weather, upload, drive.', href: 'https://github.com/arfanovidev/content-app/tree/main/api', status: 'ready' },
      { id: 20, title: 'Database Schema & Migration Files', description: 'JSON file schemas with sample data.', status: 'coming-soon' },
      { id: 21, title: 'API / Integration Code', description: 'Axios client, React Query hooks, and API endpoint constants.', href: 'https://github.com/arfanovidev/content-app/tree/main/web/lib', status: 'ready' },
      { id: 22, title: 'Authentication & Authorization Code', description: 'JWT strategy, bcrypt hashing, Google OAuth verification, and role guards.', href: 'https://github.com/arfanovidev/content-app/tree/main/api/src/modules/auth', status: 'ready' },
      { id: 23, title: 'Configuration Files', description: '.env.example with all required environment variables documented.', status: 'coming-soon' },
      { id: 24, title: 'Dependency Files', description: 'package.json manifests with exact dependency versions.', href: 'https://github.com/arfanovidev/content-app', status: 'ready' },
      { id: 25, title: 'Automated Test Files', description: 'Unit, integration, and e2e test suites (planned).', status: 'coming-soon' },
      { id: 26, title: 'README.md', description: 'Project overview, features, tech stack, and quick start guide.', href: 'https://github.com/arfanovidev/content-app', status: 'ready' },
      { id: 27, title: '.gitignore', description: 'Excludes node_modules, dist, .next, .env from version control.', status: 'coming-soon' },
    ],
  },
  {
    icon: Rocket,
    title: 'Deployment & Maintenance',
    description: 'Infrastructure, CI/CD, security, and operational runbooks.',
    items: [
      { id: 28, title: 'Dockerfile', description: 'Container configuration for reproducible deployment (planned).', status: 'coming-soon' },
      { id: 29, title: 'Docker Compose File', description: 'Multi-service orchestration for local development (planned).', status: 'coming-soon' },
      { id: 30, title: 'CI/CD Configuration', description: 'GitHub Actions workflow for automated build and test (planned).', status: 'coming-soon' },
      { id: 31, title: 'Logging & Error Handling', description: 'Structured logging and error handling patterns across the backend.', status: 'coming-soon' },
      { id: 32, title: 'Security Configuration', description: 'CORS, rate limiting, JWT config, secret rotation, OWASP checklist.', status: 'coming-soon' },
      { id: 33, title: 'Backup & Recovery Guide', description: 'Weekly backup procedure and disaster recovery steps.', status: 'coming-soon' },
      { id: 34, title: 'Maintenance Documentation', description: 'Dependency updates, security reviews, monitoring.', status: 'coming-soon' },
    ],
  },
];

interface LiveStats {
  contents: number;
  categories: number;
  status: 'loading' | 'ok' | 'error';
}

export default function DocsPage() {
  const [stats, setStats] = useState<LiveStats>({ contents: 0, categories: 0, status: 'loading' });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://content-api-f32c.onrender.com/api';
    async function fetchStats() {
      try {
        const [c, k] = await Promise.all([
          fetch(`${apiUrl}/contents`).catch(() => null),
          fetch(`${apiUrl}/categories`).catch(() => null),
        ]);
        const contents = c ? await c.json() : [];
        const categories = k ? await k.json() : [];
        setStats({
          contents: Array.isArray(contents) ? contents.length : 0,
          categories: Array.isArray(categories) ? categories.length : 0,
          status: 'ok',
        });
      } catch {
        setStats((p) => ({ ...p, status: 'error' }));
      }
    }
    fetchStats();
  }, []);

  const totalDocs = GROUPS.reduce((s, g) => s + g.items.length, 0);
  const readyDocs = GROUPS.reduce((s, g) => s + g.items.filter((i) => i.status === 'ready').length, 0);

  return (
    <div className="min-h-screen">
      <section className="v-hero border-b border-border">
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />Back to home
          </Link>

          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300">
              <FileText className="h-3.5 w-3.5" />Software Engineering Project
            </div>
            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Project{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Documentation</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Complete set of software engineering artifacts covering the full lifecycle Ã¢â‚¬" from requirements and design through implementation, testing, deployment, and maintenance.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-border bg-card px-3 py-2">
                <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  <FileText className="h-3 w-3" />Documents
                </div>
                <div className="mt-1 text-lg font-bold text-foreground">{readyDocs}/{totalDocs}</div>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-2">
                <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  <Database className="h-3 w-3" />Contents
                </div>
                <div className="mt-1 text-lg font-bold text-foreground">
                  {stats.status === 'loading' ? 'Ã¢â‚¬Â¦' : stats.status === 'error' ? 'Ã¢â‚¬"' : stats.contents}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-2">
                <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  <Server className="h-3 w-3" />Categories
                </div>
                <div className="mt-1 text-lg font-bold text-foreground">
                  {stats.status === 'loading' ? 'Ã¢â‚¬Â¦' : stats.status === 'error' ? 'Ã¢â‚¬"' : stats.categories}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-2">
                <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  <Activity className="h-3 w-3" />API Status
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${stats.status === 'ok' ? 'bg-emerald-500 animate-pulse' : stats.status === 'error' ? 'bg-red-500' : 'bg-amber-500 animate-pulse'}`} />
                  <span className="text-sm font-semibold text-foreground">
                    {stats.status === 'ok' ? 'Live' : stats.status === 'error' ? 'Offline' : 'Checking'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-16">
          {GROUPS.map((group) => {
            const Icon = group.icon;
            const groupReady = group.items.filter((i) => i.status === 'ready').length;
            return (
              <section key={group.title}>
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{group.title}</h2>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {groupReady}/{group.items.length}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
                  {group.items.map((item) => {
                    const isReady = item.status === 'ready';
                    const inner = (
                      <div className={`group flex items-start gap-4 px-4 py-4 transition-colors sm:px-5 ${isReady ? 'hover:bg-accent cursor-pointer' : ''}`}>
                        <span className="shrink-0 pt-0.5 text-xs font-mono text-muted-foreground">{String(item.id).padStart(2, '0')}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className={`text-sm font-semibold sm:text-base ${isReady ? 'text-foreground' : 'text-muted-foreground'}`}>{item.title}</h3>
                            {isReady ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                                <CheckCircle2 className="h-2.5 w-2.5" />Ready
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-400">
                                <Clock className="h-2.5 w-2.5" />Coming Soon
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.description}</p>
                        </div>
                        {isReady && <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />}
                      </div>
                    );

                    return isReady && item.href ? (
                      <Link key={item.id} href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                        {inner}
                      </Link>
                    ) : (
                      <div key={item.id}>{inner}</div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-indigo-50 to-purple-50 p-8 text-center dark:from-indigo-950/30 dark:to-purple-950/30">
          <Zap className="mx-auto h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <h2 className="mt-3 text-lg font-bold sm:text-xl">Explore the live application</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">All 25+ pages are live. Sign up, read bilingual content, try the audio player, and explore the admin panel.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="https://content-app-gamma.vercel.app" target="_blank" rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Open App<ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="https://content-api-f32c.onrender.com/api/docs" target="_blank" rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-medium hover:bg-accent">
              API Docs
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-accent">
            <ArrowLeft className="h-4 w-4" />Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}