export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const API_ENDPOINTS = {
  // Contents
  CONTENTS: '/contents',
  CONTENT_BY_SLUG: (slug: string) => `/contents/${slug}`,
  CONTENT_BY_ID: (id: string) => `/contents/${id}`,

  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_SLUG: (slug: string) => `/categories/${slug}`,

  // Auth
  LOGIN: '/auth/login',
  ME: '/auth/me',

  // Upload
  UPLOAD_IMAGE: '/upload/image',

  // Weather
  WEATHER: '/weather',

  // Completed
  COMPLETED: '/completed',
  COMPLETED_DELETE: (contentId: string) => `/completed/${contentId}`,

  // Votes
  VOTES: '/votes',
  VOTES_TALLY: (contentId: string) => `/votes/${contentId}`,
  VOTES_USER: (userKey: string) => `/votes/user/${userKey}`,
} as const;

export const ROUTES = {
  HOME: '/',
  CONTENT: (slug: string) => `/content/${slug}`,
  FAVORITES: '/favorites',
  ADMIN_LOGIN: '/admin/login',
  ADMIN: '/admin',
  ADMIN_CONTENT_NEW: '/admin/content/new',
  ADMIN_CONTENT_EDIT: (id: string) => `/admin/content/${id}/edit`,
  ADMIN_CATEGORIES: '/admin/categories',
} as const;

export const STORAGE_KEYS = {
  USER_KEY: 'user-store',
  LANG: 'lang-store',
  THEME: 'theme',
  AUTH: 'auth-store-v2', // matches store/authStore.ts persist name
} as const;