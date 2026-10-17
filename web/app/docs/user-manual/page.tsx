'use client';

import Link from 'next/link';
import { ArrowLeft, Printer, BookOpen } from 'lucide-react';

export default function UserManualPage() {
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
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-indigo-700 dark:text-indigo-300">Document 14</p>
                <h1 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">User Manual</h1>
                <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">Content App — Bilingual Reading Platform</p>
              </div>
            </div>
          </div>

          <h2>1. Getting Started</h2>
          <p>Open <strong>content-app-gamma.vercel.app</strong> in any modern browser. No installation required.</p>

          <h2>2. Creating an Account</h2>
          <ol>
            <li>Click <strong>Sign Up</strong> in the top-right corner.</li>
            <li>Enter a username, email, and password (min 6 chars).</li>
            <li>Click <strong>Create Account</strong> — you are signed in automatically.</li>
            <li>Alternatively, click <strong>Continue with Google</strong>.</li>
          </ol>

          <h2>3. Signing In</h2>
          <ol>
            <li>Click <strong>Sign In</strong>.</li>
            <li>Enter email + password, or use Google.</li>
            <li>On success you are redirected to home.</li>
          </ol>

          <h2>4. Browsing Content</h2>
          <ol>
            <li>Browse featured and latest content from the home page.</li>
            <li>Use <strong>Categories</strong> to filter by topic.</li>
            <li>Click any card to open the full content page.</li>
          </ol>

          <h2>5. Reading &amp; Language Toggle</h2>
          <ol>
            <li>Open a content page.</li>
            <li>Use the <strong>EN / বাং</strong> toggle to switch language.</li>
            <li>Scroll to track progress — the progress bar updates automatically.</li>
          </ol>

          <h2>6. Listening (Text-to-Speech)</h2>
          <ol>
            <li>On a content page, click <strong>Play</strong>.</li>
            <li>Audio starts in the selected language.</li>
            <li>Use pause / stop controls to manage playback.</li>
          </ol>
          <p className="text-sm text-muted-foreground">Note: TTS depends on browser support for Web Speech API.</p>

          <h2>7. Marking Content Complete</h2>
          <ol>
            <li>On a content page, click <strong>Mark as Complete</strong>.</li>
            <li>The item is added to favorites and progress shows 100%.</li>
          </ol>

          <h2>8. Admin Features</h2>
          <table>
            <thead><tr><th>Action</th><th>Path</th></tr></thead>
            <tbody>
              <tr><td>Create content</td><td>Admin → Content → New</td></tr>
              <tr><td>Edit content</td><td>Admin → Content → Edit</td></tr>
              <tr><td>Delete content</td><td>Admin → Content → Delete</td></tr>
              <tr><td>Manage categories</td><td>Admin → Categories</td></tr>
              <tr><td>Upload cover image</td><td>Admin → Content → New → Upload</td></tr>
            </tbody>
          </table>

          <h2>9. Theme</h2>
          <p>Toggle dark / light mode via the sun/moon icon in the navbar. The preference is saved locally.</p>

          <h2>10. Troubleshooting</h2>
          <table>
            <thead><tr><th>Issue</th><th>Solution</th></tr></thead>
            <tbody>
              <tr><td>Can't sign in</td><td>Check email / password</td></tr>
              <tr><td>Content not loading</td><td>Refresh; check API status at /docs</td></tr>
              <tr><td>No audio</td><td>Ensure browser supports TTS; check volume</td></tr>
              <tr><td>Layout broken on mobile</td><td>Update browser to latest version</td></tr>
            </tbody>
          </table>

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