'use client';

import Link from 'next/link';
import { ArrowLeft, Printer, CheckCircle2 } from 'lucide-react';

export default function TestPlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-14 z-30 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:top-16">
        <div className="container mx-auto flex max-w-4xl items-center justify-between gap-3">
          <Link href="/docs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />All documents
          </Link>
          <button type="button" onClick={() => window.print()}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium hover:bg-accent print:hidden">
            <Printer className="h-3.5 w-3.5" />Print
          </button>
        </div>
      </div>

      <article className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 print:max-w-none print:px-0">
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-h1:mb-4 prose-h1:text-3xl prose-h2:mb-3 prose-h2:mt-8 prose-h2:text-2xl prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h3:mt-6 prose-h3:text-lg prose-p:text-foreground/90 prose-table:text-sm prose-th:bg-muted prose-th:border prose-th:border-border prose-th:px-3 prose-th:py-2 prose-th:text-left prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2">

          <div className="not-prose mb-8 rounded-xl border border-indigo-500/30 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/30">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-indigo-700 dark:text-indigo-300">Document 12</p>
                <h1 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">Software Test Plan</h1>
                <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">Content App — Bilingual Reading Platform</p>
              </div>
            </div>
          </div>

          <h2>1. Introduction</h2>
          <p>This Test Plan describes the strategy, scope, levels, and environment for testing Content App. It covers unit, integration, and end-to-end testing, and defines the pass/fail criteria.</p>

          <h2>2. Test Objectives</h2>
          <ul>
            <li>Verify all functional requirements (FR-001 to FR-015).</li>
            <li>Verify all non-functional requirements (NFR-001 to NFR-010).</li>
            <li>Detect regressions before each release.</li>
            <li>Ensure cross-browser and responsive correctness.</li>
          </ul>

          <h2>3. Test Levels</h2>
          <table>
            <thead><tr><th>Level</th><th>Scope</th><th>Tool</th><th>Coverage</th></tr></thead>
            <tbody>
              <tr><td>Unit</td><td>Services, guards, pipes</td><td>Jest</td><td>≥ 80%</td></tr>
              <tr><td>Integration</td><td>Controller + service + storage</td><td>Supertest</td><td>≥ 70%</td></tr>
              <tr><td>End-to-End</td><td>Full user flows</td><td>Playwright</td><td>Core flows</td></tr>
              <tr><td>Manual</td><td>Exploratory + UI</td><td>Checklist</td><td>All features</td></tr>
            </tbody>
          </table>

          <h2>4. Test Environment</h2>
          <ul>
            <li><strong>Frontend:</strong> Vercel preview + local next dev</li>
            <li><strong>Backend:</strong> Render + local nest start</li>
            <li><strong>Storage:</strong> Test Drive folder (separate from prod)</li>
            <li><strong>Browsers:</strong> Chrome, Firefox, Safari, Edge (latest)</li>
            <li><strong>Devices:</strong> Desktop 1440px, Tablet 768px, Mobile 375px</li>
          </ul>

          <h2>5. Test Cases (sample)</h2>
          <table>
            <thead><tr><th>ID</th><th>Description</th><th>Expected</th><th>Result</th></tr></thead>
            <tbody>
              <tr><td>TC-001</td><td>Register with valid email/password</td><td>Account created, JWT returned</td><td>Pass</td></tr>
              <tr><td>TC-002</td><td>Register with duplicate email</td><td>409 Conflict</td><td>Pass</td></tr>
              <tr><td>TC-003</td><td>Login with wrong password</td><td>401 Unauthorized</td><td>Pass</td></tr>
              <tr><td>TC-004</td><td>Admin creates content</td><td>201 Created</td><td>Pass</td></tr>
              <tr><td>TC-005</td><td>User tries to create content</td><td>403 Forbidden</td><td>Pass</td></tr>
              <tr><td>TC-006</td><td>Read content list</td><td>200 with array</td><td>Pass</td></tr>
              <tr><td>TC-007</td><td>TTS plays English text</td><td>Audio starts</td><td>Pass</td></tr>
              <tr><td>TC-008</td><td>TTS plays Bengali text</td><td>Audio starts (bn voice)</td><td>Pass</td></tr>
              <tr><td>TC-009</td><td>Mark content complete</td><td>Progress = 100%</td><td>Pass</td></tr>
              <tr><td>TC-010</td><td>Responsive at 375px</td><td>No horizontal scroll</td><td>Pass</td></tr>
            </tbody>
          </table>

          <h2>6. Entry / Exit Criteria</h2>
          <h3>Entry</h3>
          <ul><li>Build succeeds, API reachable.</li><li>Test data seeded.</li></ul>
          <h3>Exit</h3>
          <ul><li>All High-priority tests pass.</li><li>No open critical defects.</li><li>Coverage targets met.</li></ul>

          <h2>7. Defect Severity</h2>
          <table>
            <thead><tr><th>Severity</th><th>Definition</th><th>Action</th></tr></thead>
            <tbody>
              <tr><td>Critical</td><td>Data loss, security breach, crash</td><td>Fix before release</td></tr>
              <tr><td>Major</td><td>Feature broken, no workaround</td><td>Fix before release</td></tr>
              <tr><td>Minor</td><td>Feature impaired, workaround exists</td><td>Fix if time</td></tr>
              <tr><td>Cosmetic</td><td>Visual only</td><td>Backlog</td></tr>
            </tbody>
          </table>

          <h2>8. Risks</h2>
          <ul>
            <li>TTS support varies by browser — test all targets.</li>
            <li>Drive rate limits — throttle during heavy testing.</li>
            <li>Render cold starts add latency — warm up before e2e.</li>
          </ul>

          <p className="mt-12 text-center">
            <Link href="/docs" className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-medium hover:bg-accent">
              <ArrowLeft className="h-4 w-4" />Back to all documents
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}