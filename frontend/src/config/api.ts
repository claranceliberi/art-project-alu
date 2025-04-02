export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  artworks: '/api/artworks',
  categories: '/api/categories',
  artists: '/api/artists',
} as const; 