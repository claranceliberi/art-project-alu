import { api } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/api';

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const categoryService = {
  getAll: () => api.get<Category[]>(API_ENDPOINTS.categories),
  
  getById: (id: string) => api.get<Category>(`${API_ENDPOINTS.categories}/${id}`),
  
  getByName: (name: string) => api.get<Category>(`${API_ENDPOINTS.categories}?name=${encodeURIComponent(name)}`),
}; 