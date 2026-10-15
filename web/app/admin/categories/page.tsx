'use client';

import { useState } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCategories } from '@/hooks/useCategories';
import {
  useCreateCategory,
  useDeleteCategory,
} from '@/hooks/useAdminContent';

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const deleteMutation = useDeleteCategory();

  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!nameEn || !nameBn) {
      setError('Both names required');
      return;
    }
    try {
      await createMutation.mutateAsync({
        name: { en: nameEn, bn: nameBn },
        description: { en: nameEn, bn: nameBn },
        icon: icon || '📄',
      });
      setNameEn('');
      setNameBn('');
      setIcon('');
    } catch (e: any) {
      setError(e?.message || 'Failed');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Categories
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage content categories
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-lg font-semibold">Add Category</h2>

        <form onSubmit={handleCreate} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="nameEn">Name (English) *</Label>
              <Input
                id="nameEn"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="Technology"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameBn">Name (বাংলা) *</Label>
              <Input
                id="nameBn"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                placeholder="প্রযুক্তি"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (emoji)</Label>
              <Input
                id="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="💻"
                maxLength={4}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {createMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Add Category
          </button>
        </form>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Existing Categories</h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !categories || categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">No categories yet</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <p className="font-semibold">
                    {cat.name.en} / {cat.name.bn}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    slug: {cat.slug} · order: {cat.order}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(cat.id, cat.name.en)}
                disabled={deleteMutation.isPending}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}