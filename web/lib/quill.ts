import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

export function renderQuill(delta: any): string {
  if (!delta?.ops || !Array.isArray(delta.ops)) return '';
  try {
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {
      inlineStyles: true,
    });
    return converter.convert();
  } catch (err) {
    console.warn('renderQuill failed:', err);
    return '';
  }
}