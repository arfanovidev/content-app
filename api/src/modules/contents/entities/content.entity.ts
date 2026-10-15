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
  quillDelta: any;
  readTime: number;
  lang: 'en' | 'bn';
  author: string;
  publishedAt: string;
  updatedAt: string;
}
