export type UserRole = 'artist' | 'buyer' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  bio: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Artwork {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  categoryId: string
  artistId: string
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  buyerId: string
  artworkId: string
  transactionDate: string
  createdAt: string
  updatedAt: string
} 