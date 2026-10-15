export interface Category {
  id: string;
  slug: string;
  name: {
    en: string;
    bn: string;
  };
  description: {
    en: string;
    bn: string;
  };
  icon: string;
  order: number;
  publishedAt: string;
  updatedAt: string;
}
