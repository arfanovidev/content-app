'use client';

import Link from 'next/link';
import { ArrowLeft, Printer, FileText } from 'lucide-react';

export default function SRSPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-14 z-30 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:top-16">
        <div className="container mx-auto flex max-w-4xl items-center justify-between gap-3">
          <Link href="/docs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            All documents
          </Link>
          <button type="button" onClick={() => window.print()}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium hover:bg-accent print:hidden">
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
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-indigo-700 dark:text-indigo-300">Document 02</p>
                <h1 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">Software Requirements Specification (SRS)</h1>
                <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">Content App — Bilingual Reading Platform</p>
              </div>
            </div>
          </div>

          <h2>1. Introduction</h2>
          <p>This Software Requirements Specification (SRS) defines the functional and non-functional requirements for Content App, a bilingual reading platform supporting English and Bengali with integrated Text-to-Speech. The SRS follows the IEEE 830-1998 structure and serves as the authoritative reference for design, implementation, and testing.</p>

          <h2>2. Purpose</h2>
          <p>The purpose of this SRS is to specify the complete set of requirements for the Content App system, establish a common understanding between stakeholders, and provide a baseline for verification and validation.</p>

          <h2>3. Scope</h2>
          <p>Content App is a full-stack bilingual reading platform with the following capabilities:</p>
          <ul>
            <li>User registration and authentication (email/password, Google OAuth)</li>
            <li>Role-based access control (Administrator, User)</li>
            <li>Bilingual content CRUD with rich-text editing</li>
            <li>Category-based content organization</li>
            <li>Text-to-Speech playback in English and Bengali</li>
            <li>Reading progress tracking and favorites</li>
            <li>Responsive interface across mobile, tablet, and desktop</li>
          </ul>

          <h2>4. Definitions and Abbreviations</h2>
          <table>
            <thead><tr><th>Term</th><th>Definition</th></tr></thead>
            <tbody>
              <tr><td>API</td><td>Application Programming Interface</td></tr>
              <tr><td>CRUD</td><td>Create, Read, Update, Delete</td></tr>
              <tr><td>JWT</td><td>JSON Web Token</td></tr>
              <tr><td>RBAC</td><td>Role-Based Access Control</td></tr>
              <tr><td>SRS</td><td>Software Requirements Specification</td></tr>
              <tr><td>TTS</td><td>Text-to-Speech</td></tr>
            </tbody>
          </table>

          <h2>5. Overall Description</h2>
          <h3>5.1 Product Perspective</h3>
          <p>Content App is a self-contained web application. It consists of a Next.js frontend, a NestJS REST API backend, and Google Drive-based JSON storage.</p>
          <h3>5.2 User Classes</h3>
          <table>
            <thead><tr><th>User Class</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>Reader</td><td>Public or authenticated user who reads content, listens to audio, and tracks progress</td></tr>
              <tr><td>Administrator</td><td>Content manager with full CRUD rights over content and categories</td></tr>
            </tbody>
          </table>
          <h3>5.3 Operating Environment</h3>
          <ul>
            <li>Modern web browsers (Chrome 100+, Firefox 100+, Safari 15+, Edge 100+)</li>
            <li>Desktop, tablet, and mobile devices</li>
            <li>Internet connection (minimum 1 Mbps)</li>
          </ul>

          <h2>6. Functional Requirements</h2>
          <table>
            <thead><tr><th>ID</th><th>Requirement</th><th>Priority</th></tr></thead>
            <tbody>
              <tr><td>FR-001</td><td>Users register with email and password</td><td>High</td></tr>
              <tr><td>FR-002</td><td>Users sign in with Google OAuth</td><td>High</td></tr>
              <tr><td>FR-003</td><td>Role-based access (Administrator, User)</td><td>High</td></tr>
              <tr><td>FR-004</td><td>Admins create bilingual content</td><td>High</td></tr>
              <tr><td>FR-005</td><td>Admins edit content</td><td>High</td></tr>
              <tr><td>FR-006</td><td>Admins delete content</td><td>High</td></tr>
              <tr><td>FR-007</td><td>Admins manage categories</td><td>High</td></tr>
              <tr><td>FR-008</td><td>Users browse by category</td><td>High</td></tr>
              <tr><td>FR-009</td><td>Content shown in English and Bengali</td><td>High</td></tr>
              <tr><td>FR-010</td><td>TTS in selected language</td><td>High</td></tr>
              <tr><td>FR-011</td><td>Progress tracked as percentage</td><td>Medium</td></tr>
              <tr><td>FR-012</td><td>Users mark content complete</td><td>Medium</td></tr>
              <tr><td>FR-013</td><td>Authenticated favorites list</td><td>Medium</td></tr>
              <tr><td>FR-014</td><td>Admins upload cover images</td><td>Medium</td></tr>
              <tr><td>FR-015</td><td>Dark / light theme toggle</td><td>Low</td></tr>
            </tbody>
          </table>

          <h2>7. Non-Functional Requirements</h2>
          <table>
            <thead><tr><th>ID</th><th>Category</th><th>Requirement</th></tr></thead>
            <tbody>
              <tr><td>NFR-001</td><td>Performance</td><td>Page load under 3s on broadband</td></tr>
              <tr><td>NFR-002</td><td>Performance</td><td>API response under 500ms</td></tr>
              <tr><td>NFR-003</td><td>Usability</td><td>Responsive on mobile/tablet/desktop</td></tr>
              <tr><td>NFR-004</td><td>Security</td><td>Passwords hashed with bcrypt cost ≥ 10</td></tr>
              <tr><td>NFR-005</td><td>Security</td><td>JWT 7-day expiry</td></tr>
              <tr><td>NFR-006</td><td>Security</td><td>Protected endpoints require auth</td></tr>
              <tr><td>NFR-007</td><td>Reliability</td><td>99% uptime on free tier</td></tr>
              <tr><td>NFR-008</td><td>Maintainability</td><td>Modular architecture</td></tr>
              <tr><td>NFR-009</td><td>Scalability</td><td>Horizontal scaling supported</td></tr>
              <tr><td>NFR-010</td><td>Accessibility</td><td>Keyboard + ARIA support</td></tr>
            </tbody>
          </table>

          <h2>8. Business Rules</h2>
          <ul>
            <li>Only Administrators may modify content or categories.</li>
            <li>Both English and Bengali title fields are mandatory.</li>
            <li>Categories must exist before being assigned to content.</li>
            <li>Marking content as complete adds it to favorites.</li>
            <li>Duplicate usernames and emails are rejected.</li>
          </ul>

          <h2>9. Constraints</h2>
          <ul>
            <li>Deployment limited to free-tier infrastructure (Vercel, Render).</li>
            <li>Storage limited to Google Drive free quota (15 GB).</li>
            <li>TTS relies on browser Web Speech API support.</li>
          </ul>

          <p className="mt-12 text-center">
            <Link href="/docs" className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-medium hover:bg-accent">
              <ArrowLeft className="h-4 w-4" />
              Back to all documents
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}