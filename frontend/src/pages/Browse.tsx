import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS, API_BASE_URL } from '../config/api'
import { Artwork, Category } from '../lib/types'
import { generateArtworkUrl } from '../lib/utils'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Slider } from '../components/ui/slider'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Section } from "@/components/ui-custom/Section";

interface ArtworkResponse {
  artworks: Artwork[]
  total: number
  page: number
  limit: number
}

const ARTWORKS = [
  // Nocturne Collection Pieces
  {
    id: 'n1',
    title: "ACTIVEGLOW",
    artist: "Elena Moonlight",
    price: 120,
    image: "/assets/images/ACTIVEGLOW.jpg",
    description: "Abstract blue waves with textured impasto technique",
    collection: "Nocturne Collection"
  },
  {
    id: 'n2',
    title: "Blue Nude",
    artist: "Katrina Case",
    price: 95,
    image: "/assets/images/Blue-Nude-2020.jpg",
    description: "Oil painting, 2020",
    collection: "Nocturne Collection"
  },
  {
    id: 'n3',
    title: "Humpback Whale",
    artist: "Elena Moonlight",
    price: 145,
    image: "/assets/images/Humpback-Whale-Oil-Painting.jpg",
    description: "Original oil painting with impasto technique, 6'' x 6''",
    collection: "Nocturne Collection"
  },
  {
    id: 'n4',
    title: "Blue Waves",
    artist: "Jérôme Karsenti",
    price: 110,
    image: "/assets/images/Jerome-Karsenti.jpg",
    description: "Contemporary blue abstract waves",
    collection: "Nocturne Collection"
  },
  {
    id: 'n5',
    title: "Venice Seascape",
    artist: "Kind of Cyan",
    price: 130,
    image: "/assets/images/Venice-Seascape-Triptych.jpg",
    description: "Blue Lido Island Reflections, Contemporary Cyanotype",
    collection: "Nocturne Collection"
  },
  // Contemporary Still Life Collection Pieces
  {
    id: 'c1',
    title: "Market Day",
    artist: "Marcus Rivera",
    price: 110,
    description: "Contemporary still life of a traditional Rwandan market",
    collection: "Contemporary Still Life"
  },
  {
    id: 'c2',
    title: "Kitchen Stories",
    artist: "Marcus Rivera",
    price: 100,
    description: "Modern interpretation of traditional kitchen scenes",
    collection: "Contemporary Still Life"
  },
  {
    id: 'c3',
    title: "Harvest Time",
    artist: "Marcus Rivera",
    price: 125,
    description: "Abstract representation of agricultural life",
    collection: "Contemporary Still Life"
  },
  {
    id: 'c4',
    title: "Family Table",
    artist: "Marcus Rivera",
    price: 105,
    description: "Contemporary take on family dining traditions",
    collection: "Contemporary Still Life"
  },
  {
    id: 'c5',
    title: "Spice Market",
    artist: "Marcus Rivera",
    price: 115,
    description: "Vibrant depiction of local spice markets",
    collection: "Contemporary Still Life"
  }
];

export default function Browse() {
  const [page, setPage] = useState(1)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [categoryId, setCategoryId] = useState<string>('all')
  const [sort, setSort] = useState<string>('createdAt:desc')

  // Fetch categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.categories}`)
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      return response.json()
    },
  })

  const { data, isLoading, error } = useQuery<ArtworkResponse>({
    queryKey: ['artworks', { page, minPrice, maxPrice, categoryId, sort }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        minPrice: minPrice.toString(),
        maxPrice: maxPrice.toString(),
        sort,
        ...(categoryId !== 'all' && { categoryId }),
      })

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.artworks}?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch artworks')
      }
      return response.json()
    },
  })

  const totalPages = data ? Math.ceil(data.total / data.limit) : 0

  return (
    <div className="page-transition">
      <Section className="section-padding py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Browse All Artworks</h1>
            <p className="text-xl text-gray-600">Explore our complete collection of artworks</p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">
              {ARTWORKS.length} {ARTWORKS.length === 1 ? 'Piece' : 'Pieces'} Available
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ARTWORKS.map((piece) => (
                <Card key={piece.id} className="group overflow-hidden">
                  <CardHeader className="aspect-square bg-gray-100 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gray-100">
                      {piece.image ? (
                        <img
                          src={piece.image}
                          alt={piece.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Image Coming Soon
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h4 className="font-medium text-lg mb-1">{piece.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">{piece.artist}</p>
                    <p className="text-xs text-gray-500 mb-2">{piece.collection}</p>
                    <p className="font-medium text-primary">
                      ${piece.price.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
