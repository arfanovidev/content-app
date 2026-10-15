'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import { useContents } from '@/hooks/useContents';
import { useCategories } from '@/hooks/useCategories';
import { useDeleteContent } from '@/hooks/useAdminContent';
import { useLangStore } from '@/store/langStore';
import { pickText, readTimeLabel } from '@/lib/format';
import { ROUTES } from '@/lib/constants';
import { useState } from 'react';

export function ContentList() {
  const { data: contents, isLoading } = useContents();
  const { data: categories } = useCategories();
  const deleteMutation = useDeleteContent();
  const lang = useLangStore((s) => s.lang);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!contents || contents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
        <p className="text-sm text-muted-foreground">No content yet</p>
        <Link
          href={ROUTES.ADMIN_CONTENT_NEW}
          className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Create first content
        </Link>
      </div>
    );
  }

  const categoryMap = new Map(categories?.map((c) => [c.id, c]) ?? []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this content?')) return;
    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {contents.map((content) => {
        const category = categoryMap.get(content.categoryId);
        const isDeleting = deletingId === content.id;

        return (
          <div
            key={content.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/30"
          >
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
              {content.coverImage && (
                <Image
                  src={content.coverImage}
                  alt={content.title.en}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold">
                {pickText(content.title, lang)}
              </h3>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {pickText(content.shortDescription, lang)}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                {category && (
                  <span>
                    {category.icon} {category.name[lang]}
                  </span>
                )}
                <span>{readTimeLabel(content.readTime, lang)}</span>
                <span>{content.lang.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Link
                href={`/admin/content/${content.id}/edit`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Edit"
              >
                <Edit className="h-4 w-4" strokeWidth={2} />
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(content.id)}
                disabled={isDeleting}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                aria-label="Delete"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}