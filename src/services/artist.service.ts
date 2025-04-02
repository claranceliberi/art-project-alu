import { api } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/api';

export interface Artist {
  id: string;
  name: string;
  email: string;
  role: 'artist';
  bio?: string;
  profileImage?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const artistService = {
  getAll: () => api.get<Artist[]>(API_ENDPOINTS.artists),
  
  getById: (id: string) => api.get<Artist>(`${API_ENDPOINTS.artists}/${id}`),
}; 