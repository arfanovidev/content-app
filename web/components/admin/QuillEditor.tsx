'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { useMemo } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[300px] w-full animate-pulse rounded-lg bg-muted" />
  ),
});

interface QuillEditorProps {
  /** HTML string value */
  value: string;
  /** Returns HTML string */
  onChange: (html: string) => void;
  /** Optional: also emits delta object (preferred for saving) */
  onChangeDelta?: (delta: { ops: any[] }) => void;
}

export function QuillEditor({
  value,
  onChange,
  onChangeDelta,
}: QuillEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link'],
        ['clean'],
      ],
    }),
    [],
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'blockquote',
    'code-block',
    'link',
  ];

  const handleChange = (
    html: string,
    delta: any,
    _source: any,
    editor: any
  ) => {
    onChange(html);
    if (onChangeDelta && editor?.getContents) {
      onChangeDelta({ ops: editor.getContents().ops });
    } else if (onChangeDelta && delta) {
      onChangeDelta({ ops: delta.ops ?? [] });
    }
  };

  return (
    <div className="quill-wrapper">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write content here..."
      />
    </div>
  );
}