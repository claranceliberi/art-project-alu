import React from 'react'
import { Layout } from '@/components/layout/Layout'
import { Section } from '@/components/ui-custom/Section'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const categories = [
  {
    id: "1",
    name: "Painting",
    description: "Traditional & contemporary painting",
    imageUrl: "/src/assets/images/painting.jpg",
    slug: "painting"
  },
  {
    id: "2",
    name: "Sculptures",
    description: "3D artworks and sculptures",
    imageUrl: "/src/assets/images/sculptures.jpg",
    slug: "sculptures"
  },
  {
    id: "3",
    name: "Performative Art",
    description: "Live art performances",
    imageUrl: "/src/assets/images/performative art icon.jpg",
    slug: "performative-art"
  },
  {
    id: "4",
    name: "Digital Art",
    description: "Digital creations and NFTs",
    imageUrl: "/src/assets/images/digital art.jpg",
    slug: "digital-art"
  },
  {
    id: "5",
    name: "Animation",
    description: "Animated artworks",
    imageUrl: "/src/assets/images/animated.jpg",
    slug: "animation"
  },
  {
    id: "6",
    name: "Fashion Design",
    description: "Contemporary fashion",
    imageUrl: "/src/assets/images/fashion design.jpg",
    slug: "fashion-design"
  },
  {
    id: "7",
    name: "Web Design",
    description: "Digital web experiences",
    imageUrl: "/src/assets/images/web design icon.jpg",
    slug: "web-design"
  },
  {
    id: "8",
    name: "Drawing",
    description: "Sketches and illustrations",
    imageUrl: "/src/assets/images/drawing.jpg",
    slug: "drawing"
  },
  {
    id: "9",
    name: "Arts & Crafts",
    description: "Handmade creations",
    imageUrl: "/src/assets/images/arts and craft.jpg",
    slug: "arts-and-crafts"
  },
  {
    id: "10",
    name: "Jewelry",
    description: "Artistic jewelry pieces",
    imageUrl: "/src/assets/images/download (1).jpg",
    slug: "jewelry"
  },
  {
    id: "11",
    name: "Photography",
    description: "Photographic art",
    imageUrl: "/src/assets/images/photography.jpg",
    slug: "photography"
  },
  {
    id: "12",
    name: "Printmaking",
    description: "Print and press art",
    imageUrl: "/src/assets/images/printmaking icon.jpg",
    slug: "printmaking"
  },
  {
    id: "13",
    name: "Literature",
    description: "Written artistry",
    imageUrl: "/src/assets/images/literature.jpg",
    slug: "literature"
  }
]

export default function Explore() {
  return (
    <Layout>
      <div className="page-transition">
        <Section 
          contentClassName="flex flex-col gap-16"
          className="section-padding py-24 bg-[#FFFFFF]"
        >
          {/* Search Section */}
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="text-7xl font-bold tracking-tight text-center mb-16">Explore Art</h1>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                type="search"
                placeholder="Search for art categories, collections, pieces, or artists..."
                className="w-full pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/categories/pieces/${category.slug}`}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              >
                <img 
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="font-medium text-lg text-white mb-2">{category.name}</h3>
                  <p className="text-sm text-white/90">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  )
} 