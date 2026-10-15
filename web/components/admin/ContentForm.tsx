'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ROUTES } from '@/lib/constants';
import { useCreateContent, useUpdateContent } from '@/hooks/useAdminContent';
import { useCategories } from '@/hooks/useCategories';
import { useMessages } from '@/hooks/useMessages';
import { QuillEditor } from './QuillEditor';
import { ImageUploader } from './ImageUploader';
import type { Content } from '@/types';

interface ContentFormProps {
  initialData?: Content;
  mode: 'create' | 'edit';
}

export function ContentForm({ initialData, mode }: ContentFormProps) {
  const router = useRouter();
  const t = useMessages();
  const { data: categories } = useCategories();

  const [titleEn, setTitleEn] = useState(initialData?.title.en ?? '');
  const [titleBn, setTitleBn] = useState(initialData?.title.bn ?? '');
  const [descEn, setDescEn] = useState(
    initialData?.shortDescription.en ?? '',
  );
  const [descBn, setDescBn] = useState(
    initialData?.shortDescription.bn ?? '',
  );
  const [categoryId, setCategoryId] = useState(
    initialData?.categoryId ?? '',
  );
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags.join(', ') ?? '',
  );
  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage ?? '',
  );
  const [content, setContent] = useState(
    initialData?.quillDelta ? renderToHtml(initialData.quillDelta) : '',
  );
  const [readTime, setReadTime] = useState(initialData?.readTime ?? 4);
  const [lang, setLang] = useState<'en' | 'bn'>(initialData?.lang ?? 'bn');
  const [author, setAuthor] = useState(initialData?.author ?? 'Admin');
  const [error, setError] = useState<string | null>(null);

  const createMutation = useCreateContent();
  const updateMutation = useUpdateContent(initialData?.id ?? '');

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!titleEn || !titleBn || !descEn || !descBn || !categoryId || !coverImage) {
      setError('Please fill in all required fields');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: { en: titleEn, bn: titleBn },
      shortDescription: { en: descEn, bn: descBn },
      categoryId,
      tags,
      coverImage,
      quillDelta: {
        ops: [{ insert: `${content}\n` }],
      },
      readTime: Number(readTime),
      lang,
      author,
    };

    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(payload);
      } else if (initialData) {
        await updateMutation.mutateAsync(payload);
      }
      router.push('/admin/content');
    } catch (e: any) {
      setError(e?.message || 'Save failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/content"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.admin.content}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="titleEn">Title (English) *</Label>
          <Input
            id="titleEn"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            placeholder="Enter English title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="titleBn">Title (বাংলা) *</Label>
          <Input
            id="titleBn"
            value={titleBn}
            onChange={(e) => setTitleBn(e.target.value)}
            placeholder="বাংলা শিরোনাম লিখুন"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="descEn">Short Description (English) *</Label>
          <Textarea
            id="descEn"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="descBn">Short Description (বাংলা) *</Label>
          <Textarea
            id="descBn"
            value={descBn}
            onChange={(e) => setDescBn(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category *</Label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
          >
            <option value="">Select category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.name.en}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="readTime">Read Time (minutes) *</Label>
          <Input
            id="readTime"
            type="number"
            min={1}
            value={readTime}
            onChange={(e) => setReadTime(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lang">Language *</Label>
          <select
            id="lang"
            value={lang}
            onChange={(e) => setLang(e.target.value as 'en' | 'bn')}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
          >
            <option value="bn">বাংলা</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="tech, ai, tutorial"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Cover Image *</Label>
        <ImageUploader value={coverImage} onChange={setCoverImage} />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <QuillEditor value={content} onChange={setContent} />
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Link
          href="/admin/content"
          className="inline-flex h-10 items-center rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" strokeWidth={2.5} />
              {mode === 'create' ? 'Create' : 'Update'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function renderToHtml(delta: any): string {
  if (!delta?.ops) return '';
  try {
    const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');
    return new QuillDeltaToHtmlConverter(delta.ops, {
      inlineStyles: true,
    }).convert();
  } catch {
    return '';
  }
}