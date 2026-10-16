import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

/**
 * Render Quill delta to HTML.
 *
 * Handles legacy buggy data:
 * if `insert` is a raw HTML string (e.g., "<p>...</p>") from an older
 * admin form version, we detect and pass through as-is instead of
 * displaying it as literal text.
 */
export function renderQuill(delta: any): string {
  if (!delta?.ops || !Array.isArray(delta.ops)) return '';

  try {
    // Detect legacy raw-HTML delta — single op whose insert starts with a tag
    const isRawHtmlDelta =
      delta.ops.length === 1 &&
      typeof delta.ops[0].insert === 'string' &&
      /^\s*<[a-z!]/i.test(delta.ops[0].insert);

    if (isRawHtmlDelta) {
      return delta.ops[0].insert as string;
    }

    const converter = new QuillDeltaToHtmlConverter(delta.ops, {
      inlineStyles: true,
    });
    return converter.convert();
  } catch (err) {
    console.warn('renderQuill failed:', err);
    return '';
  }
}