'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import { useContents } from '@/hooks/useContents';
import { useCategories } from '@/hooks/useCategories';
import { useDeleteContent } from '@/hooks/useAdminContent';
import { useLangStore } from '@/store/langStore';
import { pickText, readTimeLabel, normalizeImageUrl } from '@/lib/format';
import { ROUTES } from '@/lib/constants';
import { showSuccess, showError, confirmDelete } from '@/lib/toast';

export function ContentList() {
  const { data: contents, isLoading } = useContents();
  const { data: categories } = useCategories();
  const deleteMutation = useDeleteContent();
  const lang = useLangStore((s) => s.lang);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3"
          >
            <div className="h-16 w-24 shrink-0 animate-pulse rounded-lg bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!contents || contents.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-12 text-center">
        <p className="text-sm text-muted-foreground">No content yet</p>
        <Link
          href={ROUTES.ADMIN_CONTENT_NEW}
          className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Create first content
        </Link>
      </div>
    );
  }

  const categoryMap = new Map(categories?.map((c) => [c.id, c]) ?? []);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = await confirmDelete({
      title: 'Delete content?',
      itemName: title,
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync(id);
      showSuccess('Content deleted', 'The content has been permanently removed.');
    } catch (e: any) {
      showError('Delete failed', e?.message || 'Something went wrong');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {contents.map((content, index) => {
        const category = categoryMap.get(content.categoryId);
        const isDeleting = deletingId === content.id;
        const title = pickText(content.title, lang);
        const imageUrl = normalizeImageUrl(content.coverImage);
        const isPriority = index < 2;

        return (
          <div
            key={content.id}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
          >
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  priority={isPriority}
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-lg font-bold text-muted-foreground">
                  {title.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold">{title}</h3>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {pickText(content.shortDescription, lang)}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                {category && <span>{category.name[lang]}</span>}
                <span>{readTimeLabel(content.readTime, lang)}</span>
                <span className="uppercase">{content.lang}</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <Link
                href={`/admin/content/${content.id}/edit`}
                aria-label="Edit"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Edit className="h-4 w-4" strokeWidth={2} />
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(content.id, title)}
                disabled={isDeleting}
                aria-label="Delete"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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