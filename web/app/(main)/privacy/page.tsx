'use client';

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border bg-gradient-to-br from-slate-50 via-white to-zinc-50 dark:from-slate-950/30 dark:via-zinc-950 dark:to-zinc-900">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <Shield className="h-8 w-8 text-slate-600 dark:text-slate-400" />
            <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">Last updated: October 17, 2026</p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <div className="space-y-8 text-sm leading-relaxed text-foreground/90">
            <div>
              <h2 className="text-lg font-bold">What we collect</h2>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>• <strong className="text-foreground">Account data:</strong> name, email (when you sign in with Google or email)</li>
                <li>• <strong className="text-foreground">Reading data:</strong> progress percentage, completed stories, favorites (stored on your device and backend)</li>
                <li>• <strong className="text-foreground">Anonymous ID:</strong> a random key to link your reading progress without personal info</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold">What we don&apos;t collect</h2>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>• No advertising trackers or pixels</li>
                <li>• No third-party analytics that follow you across sites</li>
                <li>• No device fingerprinting</li>
                <li>• No location tracking beyond approximate weather display</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold">How we use your data</h2>
              <p className="mt-3 text-muted-foreground">
                Your data is used exclusively to provide the service: remembering what you&apos;ve read, saving favorites, and displaying your profile. Nothing is sold, shared, or monetized.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold">Where data is stored</h2>
              <p className="mt-3 text-muted-foreground">
                Content and account records are stored in JSON files on <strong className="text-foreground">Google Drive</strong>, accessed via our backend. The frontend runs on Vercel and the backend on Render. No separate database is used.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold">Your rights</h2>
              <p className="mt-3 text-muted-foreground">
                You can request deletion of your account and all associated data at any time by emailing <a href="mailto:privacy@daccasolution.com" className="font-medium text-foreground underline">privacy@daccasolution.com</a>. We will process deletion within 7 days.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold">Cookies</h2>
              <p className="mt-3 text-muted-foreground">
                We use <strong className="text-foreground">localStorage</strong> (not cookies) for authentication tokens and reading preferences. Nothing is sent to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold">Children</h2>
              <p className="mt-3 text-muted-foreground">
                Content App is not directed at children under 13. We don&apos;t knowingly collect data from them.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold">Changes</h2>
              <p className="mt-3 text-muted-foreground">
                If we update this policy, we&apos;ll change the &quot;last updated&quot; date at the top. Material changes will be announced on the blog.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold">Contact</h2>
              <p className="mt-3 text-muted-foreground">
                Questions? Email <a href="mailto:privacy@daccasolution.com" className="font-medium text-foreground underline">privacy@daccasolution.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}