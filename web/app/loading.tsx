export default function Loading() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-64 rounded bg-muted" />
        <div className="h-4 w-96 rounded bg-muted" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}