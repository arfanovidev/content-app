export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No ContentProtection in admin — Quill editor needs full input access
  return (
    <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-6">
      {children}
    </div>
  );
}