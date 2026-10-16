'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Loader2,
  ArrowLeft,
  FileText,
  Settings2,
  Globe,
  Hash,
  Clock,
  User,
  Layers,
  Languages,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  useCreateContent,
  useUpdateContent,
  useDeleteContent,
} from '@/hooks/useAdminContent';
import { useCategories } from '@/hooks/useCategories';
import { showSuccess, showError, confirmDelete } from '@/lib/toast';
import { QuillEditor } from './QuillEditor';
import { ImageUploader } from './ImageUploader';
import type { Content } from '@/types';

interface ContentFormProps {
  initialData?: Content;
  mode: 'create' | 'edit';
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function renderToHtml(delta: any): string {
  if (!delta?.ops || !Array.isArray(delta.ops)) return '';
  try {
    const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');
    return new QuillDeltaToHtmlConverter(delta.ops, {
      inlineStyles: true,
    }).convert();
  } catch {
    return '';
  }
}

function SectionCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <header className="flex items-start gap-3 border-b border-border/60 bg-muted/20 px-5 py-4 sm:px-6 sm:py-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground sm:text-base">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
              {description}
            </p>
          )}
        </div>
      </header>

      <div className="space-y-5 p-5 sm:p-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  counter,
  children,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  counter?: { value: number; max: number };
  children: React.ReactNode;
  htmlFor?: string;
}) {
  const over = counter ? counter.value > counter.max : false;
  const near = counter ? counter.value > counter.max * 0.9 : false;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label
          htmlFor={htmlFor}
          className="text-[13px] font-medium leading-none text-foreground"
        >
          {label}
          {required && (
            <span className="ml-1 align-middle text-destructive">*</span>
          )}
        </Label>

        {counter && (
          <span
            className={[
              'text-[11px] tabular-nums leading-none transition-colors',
              over
                ? 'font-semibold text-destructive'
                : near
                  ? 'text-amber-600 dark:text-amber-500'
                  : 'text-muted-foreground',
            ].join(' ')}
          >
            {counter.value}
            <span className="text-muted-foreground/50">/{counter.max}</span>
          </span>
        )}
      </div>

      <div className="relative">{children}</div>

      {hint && (
        <p className="text-[11px] leading-relaxed text-muted-foreground/80">
          {hint}
        </p>
      )}
    </div>
  );
}

function IconInput({
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ElementType;
}) {
  return (
    <div className="relative">
      <Icon
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70"
        strokeWidth={2}
      />
      <Input {...props} className={`pl-9 ${props.className ?? ''}`} />
    </div>
  );
}

export function ContentForm({ initialData, mode }: ContentFormProps) {
  const router = useRouter();
  const { data: categories } = useCategories();

  const [titleEn, setTitleEn] = useState(initialData?.title.en ?? '');
  const [titleBn, setTitleBn] = useState(initialData?.title.bn ?? '');
  const [descEn, setDescEn] = useState(initialData?.shortDescription.en ?? '');
  const [descBn, setDescBn] = useState(initialData?.shortDescription.bn ?? '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? '');
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags.join(', ') ?? '',
  );
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? '');

  // English article
  const [contentEn, setContentEn] = useState('');
  const [contentEnDelta, setContentEnDelta] = useState<{ ops: any[] } | null>(
    null,
  );

  // Bengali article
  const [contentBn, setContentBn] = useState('');
  const [contentBnDelta, setContentBnDelta] = useState<{ ops: any[] } | null>(
    null,
  );

  const [readTime, setReadTime] = useState(initialData?.readTime ?? 4);
  const [lang, setLang] = useState<'en' | 'bn'>(initialData?.lang ?? 'bn');
  const [author, setAuthor] = useState(initialData?.author ?? 'Admin');
  const [error, setError] = useState<string | null>(null);

  // Hydrate editors from initialData (with legacy fallback)
  useEffect(() => {
    if (!initialData) return;

    const enDelta =
      initialData.quillDeltaEn ??
      (initialData.lang === 'en' ? initialData.quillDelta : null);
    const bnDelta =
      initialData.quillDeltaBn ??
      (initialData.lang === 'bn' ? initialData.quillDelta : null);

    if (enDelta?.ops) {
      setContentEnDelta(enDelta);
      setContentEn(renderToHtml(enDelta));
    }
    if (bnDelta?.ops) {
      setContentBnDelta(bnDelta);
      setContentBn(renderToHtml(bnDelta));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createMutation = useCreateContent();
  const updateMutation = useUpdateContent(initialData?.id ?? '');
  const deleteMutation = useDeleteContent();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const slugPreview = useMemo(() => slugify(titleEn), [titleEn]);

  const tags = useMemo(
    () =>
      tagsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    [tagsInput],
  );

  const displayTitle = titleEn || titleBn || 'this content';

  const handleDelete = async () => {
    if (!initialData) return;

    const confirmed = await confirmDelete({
      title: 'Delete content?',
      itemName: displayTitle,
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });
    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(initialData.id);
      showSuccess('Content deleted', 'The content has been permanently removed.');
      router.push('/admin/content');
    } catch (e: any) {
      const msg = e?.message || 'Delete failed';
      setError(msg);
      showError('Delete failed', msg);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !titleEn ||
      !titleBn ||
      !descEn ||
      !descBn ||
      !categoryId ||
      !coverImage
    ) {
      const msg = 'Please fill in all required fields marked with *';
      setError(msg);
      showError('Missing fields', msg);
      return;
    }

    const finalEnDelta =
      contentEnDelta && contentEnDelta.ops && contentEnDelta.ops.length > 0
        ? contentEnDelta
        : { ops: [{ insert: `${stripHtml(contentEn)}\n` }] };

    const finalBnDelta =
      contentBnDelta && contentBnDelta.ops && contentBnDelta.ops.length > 0
        ? contentBnDelta
        : { ops: [{ insert: `${stripHtml(contentBn)}\n` }] };

    const payload = {
      title: { en: titleEn || titleBn, bn: titleBn || titleEn },
      shortDescription: { en: descEn || descBn, bn: descBn || descEn },
      categoryId,
      tags,
      coverImage,
      quillDeltaEn: finalEnDelta,
      quillDeltaBn: finalBnDelta,
      quillDelta: lang === 'bn' ? finalBnDelta : finalEnDelta,
      readTime: Number(readTime),
      lang,
      author,
    };

    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(payload as any);
        showSuccess('Content created', 'Your new content is now live.');
      } else if (initialData) {
        await updateMutation.mutateAsync(payload as any);
        showSuccess('Changes saved', 'Your updates have been published.');
      }
      router.push('/admin/content');
    } catch (e: any) {
      const msg = e?.message || 'Save failed';
      setError(msg);
      showError('Save failed', msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl pb-10">
      <div className="sticky top-14 z-30 mb-6 border-b border-border/70 bg-background/85 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 sm:top-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/admin/content"
              aria-label="Back"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
                {mode === 'create' ? 'New Content' : 'Edit Content'}
              </h1>
              <p className="hidden text-xs text-muted-foreground sm:block">
                {mode === 'create'
                  ? 'Fill in the fields below to publish a new piece'
                  : 'Update the fields and save your changes'}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {mode === 'edit' && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                aria-label="Delete content"
                title="Delete"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" strokeWidth={2} />
                )}
              </button>
            )}
            <Link
              href="/admin/content"
              className="hidden h-9 items-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" strokeWidth={2.25} />
                  <span>{mode === 'create' ? 'Create' : 'Update'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <SectionCard
          icon={Settings2}
          title="Metadata"
          description="Category, language and reading details"
        >
          <Field label="Category" required htmlFor="categoryId">
            <select
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="flex h-10 w-full cursor-pointer rounded-lg border border-input bg-background px-3 text-sm shadow-sm transition-colors hover:border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0"
            >
              <option value="">Select a category</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.en}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Primary Language"
            required
            htmlFor="lang"
            hint="This controls the default TTS voice and fallback article"
          >
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { value: 'bn', label: 'Bangla', icon: Languages },
                  { value: 'en', label: 'English', icon: Globe },
                ] as const
              ).map((opt) => {
                const Icon = opt.icon;
                const active = lang === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setLang(opt.value)}
                    className={[
                      'inline-flex h-10 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-all duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                      active
                        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                        : 'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground',
                    ].join(' ')}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.25} />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="Read Time (minutes)"
              required
              htmlFor="readTime"
              hint="Estimated time to read"
            >
              <IconInput
                id="readTime"
                type="number"
                min={1}
                max={120}
                value={readTime}
                onChange={(e) => setReadTime(Number(e.target.value))}
                icon={Clock}
              />
            </Field>

            <Field label="Author" htmlFor="author">
              <IconInput
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                icon={User}
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard
          icon={FileText}
          title="Content"
          description="Titles, descriptions and cover image"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="Title (English)"
              required
              htmlFor="titleEn"
              counter={{ value: titleEn.length, max: 120 }}
            >
              <Input
                id="titleEn"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value.slice(0, 120))}
                placeholder="Enter English title"
              />
            </Field>

            <Field
              label="Title (Bengali)"
              required
              htmlFor="titleBn"
              counter={{ value: titleBn.length, max: 120 }}
            >
              <Input
                id="titleBn"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value.slice(0, 120))}
                placeholder="Enter Bengali title"
              />
            </Field>
          </div>

          <Field
            label="Slug preview"
            hint="Auto-generated from English title. Backend may override."
            htmlFor="slug"
          >
            <Input
              id="slug"
              value={slugPreview}
              readOnly
              tabIndex={-1}
              className="bg-muted/40 font-mono text-xs text-muted-foreground"
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="Short Description (English)"
              required
              htmlFor="descEn"
              counter={{ value: descEn.length, max: 220 }}
            >
              <Textarea
                id="descEn"
                value={descEn}
                onChange={(e) => setDescEn(e.target.value.slice(0, 220))}
                rows={3}
                placeholder="Brief summary for cards and previews"
                className="resize-none"
              />
            </Field>

            <Field
              label="Short Description (Bengali)"
              required
              htmlFor="descBn"
              counter={{ value: descBn.length, max: 220 }}
            >
              <Textarea
                id="descBn"
                value={descBn}
                onChange={(e) => setDescBn(e.target.value.slice(0, 220))}
                rows={3}
                placeholder="Brief summary in Bengali"
                className="resize-none"
              />
            </Field>
          </div>

          <Field label="Cover Image" required>
            <ImageUploader value={coverImage} onChange={setCoverImage} />
          </Field>
        </SectionCard>

        <SectionCard
          icon={FileText}
          title="Article Body"
          description="Rich text content in both languages"
        >
          <Field
            label="Article (English)"
            hint="English rich text content — shown when UI language is English"
          >
            <QuillEditor
              value={contentEn}
              onChange={setContentEn}
              onChangeDelta={setContentEnDelta}
            />
          </Field>

          <Field
            label="Article (Bengali)"
            hint="Bengali rich text content — shown when UI language is Bengali"
          >
            <QuillEditor
              value={contentBn}
              onChange={setContentBn}
              onChangeDelta={setContentBnDelta}
            />
          </Field>
        </SectionCard>

        <SectionCard
          icon={Hash}
          title="Tags"
          description="Add comma separated keywords"
        >
          <Field
            label="Tags"
            htmlFor="tags"
            counter={{ value: tags.length, max: 12 }}
          >
            <Input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="tech, ai, tutorial"
            />
          </Field>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {tags.map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                >
                  <Layers className="h-3 w-3" strokeWidth={2.25} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle
            className="mt-0.5 h-4 w-4 shrink-0"
            strokeWidth={2.25}
          />
          <span className="leading-relaxed">{error}</span>
        </div>
      )}

      <div className="mt-6 flex items-center justify-end gap-3 border-t border-border/70 pt-6 sm:hidden">
        <Link
          href="/admin/content"
          className="inline-flex h-10 items-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" strokeWidth={2.25} />
              {mode === 'create' ? 'Create' : 'Update'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}