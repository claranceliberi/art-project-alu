import { Artwork, Category, Transaction, User } from './types'

export type UserRole = 'artist' | 'buyer' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  profileImage?: string
  bio?: string
  createdAt: string
  isVerified: boolean
}

export interface Artist extends User {
  role: 'artist'
  artworks: Artwork[]
  featuredArtworks: string[] // IDs of featured artwork
  totalSales: number
  followers: number
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Artwork {
  id: string
  title: string
  description: string
  imageUrl: string
  thumbnailUrl: string
  artistId: string
  artistName: string
  price: number
  medium: string
  dimensions: {
    width: number
    height: number
    unit: 'cm' | 'in'
  }
  categoryId: string
  categoryName: string
  year: number
  isSold: boolean
  isFeatured: boolean
  createdAt: string
}

export interface CartItem {
  artworkId: string
  title: string
  price: number
  artistName: string
  imageUrl: string
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  createdAt: string
}

export interface Address {
  fullName: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Mock data for development

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    bio: 'Platform administrator',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const categories: Category[] = [
  {
    id: '1',
    name: 'Original Art',
    description: 'One-of-a-kind original artworks',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Photography',
    description: 'Fine art photography prints',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Digital Art',
    description: 'Digital and mixed media artwork',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Sculptures',
    description: '3D artworks and sculptures',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Abstract',
    description: 'Abstract and contemporary art',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Ethereal Waves',
    description: 'Abstract fluid art with mesmerizing patterns',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1621419203897-20b66b98d495?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '5', // Abstract
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Urban Reflections',
    description: 'Contemporary urban photography',
    price: 800,
    imageUrl: 'https://images.unsplash.com/photo-1556379069-7c1b1b8990b0?q=80&w=1753&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '2', // Photography
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Digital Dreams',
    description: 'Digital art exploring surreal landscapes',
    price: 950,
    imageUrl: 'https://images.unsplash.com/photo-1530021853947-7d73da7acb70?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '3', // Digital Art
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Geometric Harmony',
    description: 'Abstract geometric patterns in vibrant colors',
    price: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1654240013739-77cdfccb68e0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '5', // Abstract
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Nature\'s Canvas',
    description: 'Fine art nature photography',
    price: 750,
    imageUrl: 'https://images.unsplash.com/photo-1604095087270-be6e0ea58fb0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '2', // Photography
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Modern Expressions',
    description: 'Contemporary abstract expressionism',
    price: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1600812180022-e133da09c000?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '1', // Original Art
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Digital Fusion',
    description: 'Mixed media digital artwork',
    price: 1100,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1723600942485-b1c02c8a0a81?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '3', // Digital Art
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Sculptural Forms',
    description: 'Abstract sculptural photography',
    price: 1800,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1723575835595-b9d7c183d995?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '4', // Sculptures
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Urban Geometry',
    description: 'Architectural photography art',
    price: 900,
    imageUrl: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '2', // Photography
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    title: 'Abstract Flow',
    description: 'Fluid abstract art composition',
    price: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '5', // Abstract
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '11',
    title: 'Digital Landscapes',
    description: 'Digital art exploring natural forms',
    price: 1300,
    imageUrl: 'https://images.unsplash.com/photo-1579541513287-3f17a5d8d62c?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '3', // Digital Art
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    title: 'Sculptural Light',
    description: 'Light and form in sculpture',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1577083553180-732e5d4b2d39?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '4', // Sculptures
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '13',
    title: 'Abstract Harmony',
    description: 'Contemporary abstract composition',
    price: 1900,
    imageUrl: 'https://images.unsplash.com/photo-1579168730073-4541e40ca43a?q=80&w=1957&auto=format&fit=crop&ixlib=rb-4.0.3',
    categoryId: '5', // Abstract
    artistId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const transactions: Transaction[] = [
  {
    id: '1',
    amount: 1200,
    status: 'completed',
    buyerId: '1',
    artworkId: '1',
    transactionDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const featuredArtists: Artist[] = [
  {
    id: '1',
    name: 'Maya Johnson',
    email: 'maya@example.com',
    role: 'artist',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Maya Johnson is a contemporary abstract artist whose work explores the intersection of color, emotion, and movement. With over 15 years of experience, her paintings have been exhibited internationally and are part of several prestigious collections.',
    createdAt: '2020-03-10T00:00:00Z',
    isVerified: true,
    artworks: artworks.filter(a => a.artistId === '1'),
    featuredArtworks: ['1', '6'],
    totalSales: 45,
    followers: 2300
  },
  {
    id: '2',
    name: 'Thomas Mitchell',
    email: 'thomas@example.com',
    role: 'artist',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    bio: 'Thomas Mitchell is an award-winning photographer specializing in urban landscapes and architectural photography. His distinctive style combines technical precision with an emotional connection to urban environments.',
    createdAt: '2019-07-22T00:00:00Z',
    isVerified: true,
    artworks: artworks.filter(a => a.artistId === '2'),
    featuredArtworks: ['2', '8'],
    totalSales: 38,
    followers: 1850
  },
  {
    id: '3',
    name: 'Emma Davidson',
    email: 'emma@example.com',
    role: 'artist',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    bio: 'Emma Davidson creates serene, dreamlike paintings that bridge the gap between representation and abstraction. Her works are characterized by their harmonious color palettes and ethereal quality.',
    createdAt: '2020-11-15T00:00:00Z',
    isVerified: true,
    artworks: artworks.filter(a => a.artistId === '3'),
    featuredArtworks: ['3', '7'],
    totalSales: 29,
    followers: 1420
  }
]
