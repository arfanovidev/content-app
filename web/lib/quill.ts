import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

export function renderQuill(delta: any): string {
  if (!delta || !delta.ops || !Array.isArray(delta.ops)) {
    return '';
  }

  try {
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {
      inlineStyles: true,
    });
    return converter.convert();
  } catch (error) {
    console.error('Quill render error:', error);
    return '';
  }
}
