import { BookOpen, Headphones, Globe2, Sparkles } from 'lucide-react';

export function HomeSections() {
  return (
    <>
      {/* ============ INTRO / MISSION ============ */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Reading, on your own terms
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Content App is a bilingual reading and research platform built for
              people who want to read deeply — not scroll endlessly. It works in
              English and Bengali with the same care, with native text-to-speech,
              saved favorites, and reading progress that actually helps.
            </p>
            <p>
              There are no ads, no trackers, and no algorithmic feed. You choose
              what to read, when to read it, and whether to listen. Everything else
              is quiet.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What makes it different
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Four small choices that add up to a calmer reading experience.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Globe2 className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
              <h3 className="mt-3 text-base font-semibold">Bilingual by design</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                English and Bengali sit side by side — not as translations, but as
                equals. Switch languages anytime without losing your place.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <Headphones className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
              <h3 className="mt-3 text-base font-semibold">Listen anywhere</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Native text-to-speech in both languages. Free, offline in many
                cases, and private — nothing leaves your device.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <BookOpen className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
              <h3 className="mt-3 text-base font-semibold">Track what you finish</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                A quiet reading-progress bar, a favorites list, and a small streak
                counter. No dashboards, no anxiety.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <Sparkles className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
              <h3 className="mt-3 text-base font-semibold">No ads. No tracking.</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                No banner ads, no third-party analytics, no data selling. The reader
                is not the product — that is the whole point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO IT'S FOR ============ */}
      <section className="border-b border-border">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Who it&apos;s for
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Bilingual readers</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Students, researchers, and curious readers who move between English
                and Bengali every day — and want a tool that respects both.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Listeners</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Commuters, cooks, and caretakers who want to keep reading with their
                ears while their hands are busy.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Writers</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                People who want a quiet place to publish thoughtful essays — without
                growth hacks, engagement tricks, or an algorithm deciding who reads
                them.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Educators</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Teachers and tutors looking for a bilingual reading platform their
                students can trust — free, ad-free, and private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-8 space-y-4">
            <details className="group rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer list-none text-sm font-medium">
                Is Content App free?
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Yes. No paywall, no subscription. Reader support (donations) keeps it
                running, but everything is readable without paying.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer list-none text-sm font-medium">
                Do I need an account to read?
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Public stories are open to everyone. An account lets you save
                favorites, track progress, and pick up where you left off across
                devices.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer list-none text-sm font-medium">
                How does text-to-speech work?
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                It uses your browser&apos;s native Web Speech API. The voice is
                generated on your device — free, private, and available in both
                English and Bengali.
              </p>
            </details>
            <details className="group rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer list-none text-sm font-medium">
                Is my data safe?
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We collect the minimum: an email, a username, and your reading
                progress. No ads, no trackers, no data selling. See our{' '}
                <a href="/privacy" className="underline hover:no-underline">
                  Privacy Policy
                </a>
                .
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}