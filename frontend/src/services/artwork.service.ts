import { api } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/api';

export interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  price: number;
  quantity: number;
  medium: string;
  dimensions: {
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  categoryId: string;
  categoryName: string;
  artistId: string;
  artistName: string;
  year: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArtworkResponse {
  artworks: Artwork[];
  total: number;
  page: number;
  limit: number;
}

export interface ArtworkQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  categoryIds?: string[];
  artistId?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
}

export interface CreateArtworkData {
  title: string;
  description?: string;
  price: number;
  categoryId: string;
  artistId: string;
  image: File;
}

export interface UpdateArtworkData extends Partial<Omit<CreateArtworkData, 'image'>> {
  image?: File;
}

export const artworkService = {
  getAll: (params?: ArtworkQueryParams) => {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === 'categoryIds' && Array.isArray(value)) {
            queryParams.append(key, value.join(','));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }
    
    const query = queryParams.toString();
    const url = query ? `${API_ENDPOINTS.artworks}?${query}` : API_ENDPOINTS.artworks;
    
    return api.get<ArtworkResponse>(url);
  },
  
  getById: (id: string) => api.get<Artwork>(`${API_ENDPOINTS.artworks}/${id}`),
  
  getByCategory: (categoryId: string, params?: Omit<ArtworkQueryParams, 'categoryId'>) => {
    const queryParams = new URLSearchParams({ categoryId });
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return api.get<ArtworkResponse>(`${API_ENDPOINTS.artworks}?${queryParams.toString()}`);
  },
    
  getByArtist: (artistId: string, params?: Omit<ArtworkQueryParams, 'artistId'>) => {
    const queryParams = new URLSearchParams({ artistId });
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return api.get<ArtworkResponse>(`${API_ENDPOINTS.artworks}?${queryParams.toString()}`);
  },
  
  create: async (data: CreateArtworkData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    return api.post<Artwork>(API_ENDPOINTS.artworks, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  update: async (id: string, data: UpdateArtworkData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });
    
    return api.put<Artwork>(`${API_ENDPOINTS.artworks}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  delete: (id: string) => api.delete(`${API_ENDPOINTS.artworks}/${id}`),
}; 