'use client';

import Link from 'next/link';
import { ArrowLeft, Printer, Server } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-14 z-30 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:top-16">
        <div className="container mx-auto flex max-w-4xl items-center justify-between gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All documents
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium hover:bg-accent print:hidden"
          >
            <Printer className="h-3.5 w-3.5" />
            Print
          </button>
        </div>
      </div>

      <article className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 print:max-w-none print:px-0">
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-h1:mb-4 prose-h1:text-3xl prose-h2:mb-3 prose-h2:mt-8 prose-h2:text-2xl prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h3:mt-6 prose-h3:text-lg prose-p:text-foreground/90 prose-table:text-sm prose-th:bg-muted prose-th:border prose-th:border-border prose-th:px-3 prose-th:py-2 prose-th:text-left prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2">

          <div className="not-prose mb-8 rounded-xl border border-indigo-500/30 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/30">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
                  Document 04
                </p>
                <h1 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                  System Architecture Document
                </h1>
                <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
                  Content App — Bilingual Reading Platform
                </p>
              </div>
            </div>
          </div>

          <h2>1. Overview</h2>
          <p>
            Content App follows a <strong>two-tier client-server architecture</strong>:
            a Next.js frontend (presentation + client-side logic) communicating
            with a NestJS REST API (business logic + data access), backed by
            Google Drive JSON storage.
          </p>

          <h2>2. High-Level Architecture</h2>
          <pre className="not-prose overflow-x-auto rounded-lg border border-border bg-muted p-4 text-xs leading-relaxed">
{`┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Next.js 16 App Router (Vercel)                   │  │
│  │  • React Server + Client Components               │  │
│  │  • Zustand state  • React Query  • Tailwind v4    │  │
│  └───────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────┘
                            │ HTTPS (REST / JSON)
                            ▼
┌─────────────────────────────────────────────────────────┐
│              API SERVER (Render)                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │  NestJS 12 (REST)                                 │  │
│  │  • Auth module (JWT, Google OAuth, bcrypt)        │  │
│  │  • Contents  • Categories  • Completed            │  │
│  │  • Votes     • Weather     • Upload  • Drive      │  │
│  │  • Guards, interceptors, global validation        │  │
│  └───────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────┘
                            │ Google Drive API
                            ▼
┌─────────────────────────────────────────────────────────┐
│              STORAGE (Google Drive)                     │
│  users.json  contents.json  categories.json             │
│  completed.json  votes.json                             │
└─────────────────────────────────────────────────────────┘`}
          </pre>

          <h2>3. Component Responsibilities</h2>
          <table>
            <thead>
              <tr><th>Component</th><th>Responsibility</th></tr>
            </thead>
            <tbody>
              <tr><td>Next.js Frontend</td><td>Routing, SSR/SSG, UI rendering, client state, TTS playback, forms</td></tr>
              <tr><td>NestJS API</td><td>REST endpoints, validation, auth, RBAC, business rules</td></tr>
              <tr><td>Google Drive</td><td>Persistent JSON storage for all entities</td></tr>
              <tr><td>Web Speech API</td><td>Browser-native Text-to-Speech (EN / BN)</td></tr>
            </tbody>
          </table>

          <h2>4. Backend Modules</h2>
          <table>
            <thead>
              <tr><th>Module</th><th>Endpoints</th><th>Auth</th></tr>
            </thead>
            <tbody>
              <tr><td>auth</td><td>/auth/register, /auth/login, /auth/google, /auth/me</td><td>Public / Protected</td></tr>
              <tr><td>contents</td><td>/contents (GET, POST, PATCH, DELETE)</td><td>Read public, write Admin</td></tr>
              <tr><td>categories</td><td>/categories (GET, POST, PATCH, DELETE)</td><td>Read public, write Admin</td></tr>
              <tr><td>completed</td><td>/completed (GET, POST, DELETE)</td><td>User</td></tr>
              <tr><td>votes</td><td>/votes (GET, POST)</td><td>User</td></tr>
              <tr><td>weather</td><td>/weather</td><td>Public</td></tr>
              <tr><td>upload</td><td>/upload (POST)</td><td>Admin</td></tr>
              <tr><td>drive</td><td>Internal only</td><td>—</td></tr>
            </tbody>
          </table>

          <h2>5. Data Flow — Read Content</h2>
          <ol>
            <li>Client requests <code>/api/contents</code> via React Query hook.</li>
            <li>NestJS <code>ContentsController</code> invokes <code>ContentsService</code>.</li>
            <li>Service calls <code>DriveService</code> to fetch <code>contents.json</code>.</li>
            <li>DriveService uses Google Drive API with a service account.</li>
            <li>JSON is parsed, filtered, and returned to the client.</li>
            <li>React Query caches the response for subsequent renders.</li>
          </ol>

          <h2>6. Authentication Flow</h2>
          <ol>
            <li>User submits credentials (or Google OAuth token).</li>
            <li>AuthService validates and signs a JWT (7-day expiry).</li>
            <li>Client stores JWT (httpOnly cookie / localStorage).</li>
            <li>Protected requests attach <code>Authorization: Bearer &lt;token&gt;</code>.</li>
            <li><code>JwtAuthGuard</code> validates the token; <code>RolesGuard</code> checks role.</li>
          </ol>

          <h2>7. Deployment Topology</h2>
          <table>
            <thead>
              <tr><th>Layer</th><th>Platform</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td>Frontend</td><td>Vercel</td><td>Edge network, auto CI from GitHub</td></tr>
              <tr><td>Backend</td><td>Render</td><td>Free web service, auto-deploy on push</td></tr>
              <tr><td>Storage</td><td>Google Drive</td><td>Service account, 15 GB free quota</td></tr>
            </tbody>
          </table>

          <h2>8. Quality Attributes</h2>
          <ul>
            <li><strong>Modularity:</strong> Each backend concern is a NestJS module.</li>
            <li><strong>Scalability:</strong> Stateless API allows horizontal scaling.</li>
            <li><strong>Security:</strong> JWT + bcrypt + role guards + CORS + validation.</li>
            <li><strong>Maintainability:</strong> TypeScript end-to-end, shared types.</li>
          </ul>

          <p className="mt-12 text-center">
            <Link
              href="/docs"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-medium hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all documents
            </Link>
          </p>

        </div>
      </article>
    </div>
  );
}