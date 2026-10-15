export interface BilingualText {
  en: string;
  bn: string;
}

export interface Content {
  id: string;
  slug: string;
  title: BilingualText;
  shortDescription: BilingualText;
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

export interface Category {
  id: string;
  slug: string;
  name: BilingualText;
  description: BilingualText;
  icon: string;
  order: number;
  publishedAt: string;
  updatedAt: string;
}

export interface WeatherResponse {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  windSpeed: number;
  clouds: number;
  sunrise: number;
  sunset: number;
  fetchedAt: string;
}

export interface CompletedRecord {
  id: string;
  contentId: string;
  userKey: string;
  completedAt: string;
  readDuration?: number;
}

export interface VoteTally {
  contentId: string;
  up: number;
  down: number;
  score: number;
  userVote?: 1 | -1 | 0;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    username: string;
    role: string;
  };
}
