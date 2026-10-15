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
  quillDelta: any; // Quill Delta JSON
  readTime: number; // minutes
  lang: 'en' | 'bn';
  author: string;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
}