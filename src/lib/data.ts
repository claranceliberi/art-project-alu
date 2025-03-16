
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

export const categories: Category[] = [
  { id: '1', name: 'Painting', slug: 'painting' },
  { id: '2', name: 'Sculpture', slug: 'sculpture' },
  { id: '3', name: 'Photography', slug: 'photography' },
  { id: '4', name: 'Digital Art', slug: 'digital-art' },
  { id: '5', name: 'Mixed Media', slug: 'mixed-media' },
]

export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Harmony in Blue',
    description: 'A captivating abstract piece exploring the depth and tranquility of blue tones, inviting the viewer to immerse themselves in a meditative experience. Layers of paint create a sense of depth and movement.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=300&q=80',
    artistId: '1',
    artistName: 'Maya Johnson',
    price: 1200,
    medium: 'Acrylic on canvas',
    dimensions: { width: 90, height: 120, unit: 'cm' },
    categoryId: '1',
    categoryName: 'Painting',
    year: 2022,
    isSold: false,
    isFeatured: true,
    createdAt: '2022-06-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'Urban Reflections',
    description: 'A striking cityscape captured at dusk, when the buildings reflect in rain-soaked streets. The interplay of artificial light and natural elements creates a dynamic urban narrative.',
    imageUrl: 'https://images.unsplash.com/photo-1624037693688-fe7d9c4fa88c',
    thumbnailUrl: 'https://images.unsplash.com/photo-1624037693688-fe7d9c4fa88c?auto=format&fit=crop&w=300&q=80',
    artistId: '2',
    artistName: 'Thomas Mitchell',
    price: 950,
    medium: 'Photography, Archival Print',
    dimensions: { width: 60, height: 40, unit: 'cm' },
    categoryId: '3',
    categoryName: 'Photography',
    year: 2021,
    isSold: false,
    isFeatured: true,
    createdAt: '2021-11-20T14:45:00Z',
  },
  {
    id: '3',
    title: 'Ethereal Landscape',
    description: 'A dreamlike landscape painting that blends reality with imagination. Soft brushstrokes and a harmonious color palette evoke a sense of peace and nostalgia.',
    imageUrl: 'https://images.unsplash.com/photo-1617639598840-0445a7d6a9df',
    thumbnailUrl: 'https://images.unsplash.com/photo-1617639598840-0445a7d6a9df?auto=format&fit=crop&w=300&q=80',
    artistId: '3',
    artistName: 'Emma Davidson',
    price: 1800,
    medium: 'Oil on canvas',
    dimensions: { width: 100, height: 80, unit: 'cm' },
    categoryId: '1',
    categoryName: 'Painting',
    year: 2023,
    isSold: false,
    isFeatured: false,
    createdAt: '2023-01-05T09:15:00Z',
  },
  {
    id: '4',
    title: 'Form and Void',
    description: 'A contemporary sculpture exploring the relationship between positive and negative space. The piece invites viewers to consider what defines an object - its material presence or the space it occupies.',
    imageUrl: 'https://images.unsplash.com/photo-1576773689115-5cd2b0223523',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576773689115-5cd2b0223523?auto=format&fit=crop&w=300&q=80',
    artistId: '4',
    artistName: 'Marcus Zhang',
    price: 2200,
    medium: 'Bronze',
    dimensions: { width: 30, height: 45, unit: 'cm' },
    categoryId: '2',
    categoryName: 'Sculpture',
    year: 2022,
    isSold: true,
    isFeatured: false,
    createdAt: '2022-08-12T16:20:00Z',
  },
  {
    id: '5',
    title: 'Digital Dreamscape',
    description: 'A vibrant digital artwork combining elements of surrealism and futurism. Created using advanced 3D modeling techniques and digital painting.',
    imageUrl: 'https://images.unsplash.com/photo-1633623239416-49bfd78ca0e1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633623239416-49bfd78ca0e1?auto=format&fit=crop&w=300&q=80',
    artistId: '5',
    artistName: 'Sophia Lee',
    price: 750,
    medium: 'Digital Art, Limited Edition Print',
    dimensions: { width: 50, height: 50, unit: 'cm' },
    categoryId: '4',
    categoryName: 'Digital Art',
    year: 2023,
    isSold: false,
    isFeatured: true,
    createdAt: '2023-03-27T11:40:00Z',
  },
  {
    id: '6',
    title: 'Textural Study No. 7',
    description: 'An exploration of texture and material, combining traditional painting techniques with collage elements. The work creates a tactile experience that changes with lighting and viewing angle.',
    imageUrl: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=300&q=80',
    artistId: '1',
    artistName: 'Maya Johnson',
    price: 1450,
    medium: 'Mixed Media on canvas',
    dimensions: { width: 75, height: 75, unit: 'cm' },
    categoryId: '5',
    categoryName: 'Mixed Media',
    year: 2022,
    isSold: false,
    isFeatured: false,
    createdAt: '2022-10-08T13:25:00Z',
  },
  {
    id: '7',
    title: 'Serenity',
    description: 'A minimalist composition featuring subtle color gradients and elegant lines. This piece embodies the principles of simplicity and mindfulness.',
    imageUrl: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=300&q=80',
    artistId: '3',
    artistName: 'Emma Davidson',
    price: 980,
    medium: 'Acrylic on paper',
    dimensions: { width: 60, height: 80, unit: 'cm' },
    categoryId: '1',
    categoryName: 'Painting',
    year: 2021,
    isSold: false,
    isFeatured: true,
    createdAt: '2021-09-17T15:10:00Z',
  },
  {
    id: '8',
    title: 'Architectural Rhythm',
    description: 'A photographic study of contemporary architecture, focusing on patterns, repetition, and the interplay between light and shadow on geometric structures.',
    imageUrl: 'https://images.unsplash.com/photo-1608501821229-a93120c118ff',
    thumbnailUrl: 'https://images.unsplash.com/photo-1608501821229-a93120c118ff?auto=format&fit=crop&w=300&q=80',
    artistId: '2',
    artistName: 'Thomas Mitchell',
    price: 850,
    medium: 'Photography, Archival Print',
    dimensions: { width: 70, height: 50, unit: 'cm' },
    categoryId: '3',
    categoryName: 'Photography',
    year: 2022,
    isSold: false,
    isFeatured: false,
    createdAt: '2022-04-22T09:50:00Z',
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
