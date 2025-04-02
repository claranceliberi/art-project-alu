export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  artworks: `${API_BASE_URL}/api/artworks`,
  categories: `${API_BASE_URL}/api/categories`,
  artists: `${API_BASE_URL}/api/artists`,
} as const; 