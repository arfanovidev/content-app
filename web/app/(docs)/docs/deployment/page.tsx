'use client';

import Link from 'next/link';
import { ArrowLeft, Printer, Rocket } from 'lucide-react';

export default function DeploymentPage() {
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
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
                  Document 15
                </p>
                <h1 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                  Installation & Deployment Guide
                </h1>
                <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
                  Content App — Bilingual Reading Platform
                </p>
              </div>
            </div>
          </div>

          <h2>1. Prerequisites</h2>
          <ul>
            <li>Node.js 20+ and npm 10+</li>
            <li>Git</li>
            <li>A Google Cloud service account with Drive API enabled</li>
            <li>Accounts on Vercel and Render</li>
          </ul>

          <h2>2. Local Setup</h2>
          <h3>2.1 Clone</h3>
          <pre className="not-prose overflow-x-auto rounded-lg border border-border bg-muted p-4 text-xs">
{`git clone https://github.com/arfanovidev/content-app.git
cd content-app`}
          </pre>

          <h3>2.2 Backend (api/)</h3>
          <pre className="not-prose overflow-x-auto rounded-lg border border-border bg-muted p-4 text-xs">
{`cd api
npm install
cp .env.example .env
# fill in the environment variables (see §3)
npm run start:dev`}
          </pre>
          <p>API runs at <code>http://localhost:3001/api</code>.</p>

          <h3>2.3 Frontend (web/)</h3>
          <pre className="not-prose overflow-x-auto rounded-lg border border-border bg-muted p-4 text-xs">
{`cd web
npm install
cp .env.example .env.local
# set NEXT_PUBLIC_API_URL=http://localhost:3001/api
npm run dev`}
          </pre>
          <p>App runs at <code>http://localhost:3000</code>.</p>

          <h2>3. Environment Variables</h2>
          <h3>Backend (api/.env)</h3>
          <table>
            <thead>
              <tr><th>Variable</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td>PORT</td><td>Server port (default 3001)</td></tr>
              <tr><td>JWT_SECRET</td><td>Secret for signing JWTs</td></tr>
              <tr><td>JWT_EXPIRES_IN</td><td>Token lifetime (e.g. 7d)</td></tr>
              <tr><td>GOOGLE_CLIENT_ID</td><td>Google OAuth client ID</td></tr>
              <tr><td>GOOGLE_SERVICE_ACCOUNT_EMAIL</td><td>Drive service account email</td></tr>
              <tr><td>GOOGLE_PRIVATE_KEY</td><td>Service account private key</td></tr>
              <tr><td>GOOGLE_DRIVE_FOLDER_ID</td><td>Target Drive folder ID</td></tr>
              <tr><td>CORS_ORIGIN</td><td>Allowed frontend origin</td></tr>
            </tbody>
          </table>

          <h3>Frontend (web/.env.local)</h3>
          <table>
            <thead>
              <tr><th>Variable</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td>NEXT_PUBLIC_API_URL</td><td>Backend API base URL</td></tr>
              <tr><td>NEXT_PUBLIC_GOOGLE_CLIENT_ID</td><td>Google OAuth client ID</td></tr>
            </tbody>
          </table>

          <h2>4. Google Drive Setup</h2>
          <ol>
            <li>Create a Google Cloud project.</li>
            <li>Enable the <strong>Google Drive API</strong>.</li>
            <li>Create a service account and download its JSON key.</li>
            <li>Create a Drive folder and share it with the service account email (Editor).</li>
            <li>Copy the folder ID into <code>GOOGLE_DRIVE_FOLDER_ID</code>.</li>
          </ol>

          <h2>5. Deploy Backend to Render</h2>
          <ol>
            <li>New → Web Service → connect the GitHub repo.</li>
            <li>Root directory: <code>api</code>.</li>
            <li>Build: <code>npm install &amp;&amp; npm run build</code>.</li>
            <li>Start: <code>npm run start:prod</code>.</li>
            <li>Add all environment variables from §3.</li>
            <li>Deploy — note the public URL.</li>
          </ol>

          <h2>6. Deploy Frontend to Vercel</h2>
          <ol>
            <li>Import the GitHub repo in Vercel.</li>
            <li>Root directory: <code>web</code>.</li>
            <li>Framework preset: Next.js (auto-detected).</li>
            <li>Add <code>NEXT_PUBLIC_API_URL</code> = your Render URL + <code>/api</code>.</li>
            <li>Deploy.</li>
          </ol>

          <h2>7. Post-Deployment Checks</h2>
          <ul>
            <li><code>GET /api/contents</code> returns 200.</li>
            <li>Home page loads and lists content.</li>
            <li>Sign up / sign in work.</li>
            <li>Swagger UI reachable at <code>/api/docs</code>.</li>
            <li>Admin can create content.</li>
          </ul>

          <h2>8. Rollback</h2>
          <ol>
            <li><strong>Vercel:</strong> Deployments → previous → Promote.</li>
            <li><strong>Render:</strong> Events → previous deploy → Redeploy.</li>
            <li><strong>Storage:</strong> Restore from weekly Drive backup.</li>
          </ol>

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