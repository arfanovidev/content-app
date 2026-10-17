export interface Content {
  id: string;
  slug: string;
  title: {
    en: string;
    bn: string;
  };
  shortDescription: {
    en: string;
    bn: string;
  };
  categoryId: string;
  tags: string[];
  coverImage: string;
  /** @deprecated use quillDeltaEn / quillDeltaBn */
  quillDelta?: any;
  quillDeltaEn?: any; // Quill Delta JSON (English)
  quillDeltaBn?: any; // Quill Delta JSON (Bengali)
  readTime: number; // minutes
  lang: 'en' | 'bn';
  author: string;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
}