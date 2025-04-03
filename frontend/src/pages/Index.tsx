import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/ui-custom/Hero'
import { Section } from '@/components/ui-custom/Section'
import { CollectionCard } from '@/components/ui-custom/CollectionCard'
import { ArtistCard } from '@/components/ui-custom/ArtistCard'
import { CategoryCard } from '@/components/ui-custom/CategoryCard'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { featuredArtists, categories } from '@/lib/data'

// Collection data
const collections = [
  {
    title: "#style #art",
    description: "Contemporary fashion and artistic expression",
    imageUrl: "/assets/images/download (46).jpg"
  },
  {
    title: "Artist",
    description: "Celebrating creative visionaries",
    imageUrl: "/assets/images/download (45).jpg"
  },
  {
    title: "Avenue",
    description: "Creative content and design excellence",
    imageUrl: "/assets/images/e90dd457-abf3-40d6-86bc-270fda5e5fc7.jpg"
  }
]

export default function Index() {
  return (
    <Layout>
      <div className="page-transition">
        <Hero />
        
        {/* Collections */}
        <Section 
          contentClassName="flex flex-col gap-12"
          className="section-padding py-24 bg-[#FFFFFF]"
        >
          <div className="flex flex-col lg:flex-row gap-16 items-start bg-[#FFFFFF] min-h-[800px]">
            <div className="relative w-full lg:w-[600px] flex-shrink-0 overflow-hidden">
              <img 
                src="/assets/images/download.jpg" 
                alt="Collection Feature"
                className="w-full h-[800px] object-cover scale-110 object-left rounded-lg bg-[#FFFFFF]"
              />
            </div>

            <div className="flex flex-col gap-16 flex-1 bg-[#FFFFFF]">
              <div className="lg:pt-48">
                <h2 className="text-7xl font-bold tracking-tight mb-8">Collections</h2>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Step into the world of phtographic art which blends traditional mastery with modern vision. Where one piece expresses so much using so little.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full bg-[#FFFFFF] mt-auto">
                {collections.map(collection => (
                  <CollectionCard 
                    key={collection.title}
                    title={collection.title}
                    description={collection.description}
                    imageUrl={collection.imageUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>
        
        {/* Browse by Category */}
        <Section 
          contentClassName="flex flex-col gap-16"
          className="section-padding py-24 bg-[#FFFFFF]"
        >
          <div className="flex flex-col min-h-[800px]">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-1">
                  <h2 className="text-7xl font-bold tracking-tight mb-8">Browse by Category</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                    Browse our curated collections by selecting your preferred category—whether you're drawn to bold abstract paintings, serene landscapes, striking portraits, or contemporary photography. Start your journey here, and let art that speaks to you find its way to your space.
                  </p>
                </div>
                <div className="w-full lg:w-[500px] h-[500px] flex-shrink-0 bg-[#FFFFFF] rounded-lg flex items-center justify-center">
                  <div className="w-[500px] h-[500px] relative group">
                    <img 
                      src="/assets/images/animated.jpg"
                      alt="Animation"
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center rounded-lg bg-black/60">
                      <h3 className="font-medium text-lg text-white mb-2">Animation</h3>
                      <p className="text-sm text-white/90">Explore animated artworks</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                <CategoryCard 
                  key="digital-art"
                  category={{
                    id: "1",
                    name: "Digital Art",
                    description: "Explore digital creations",
                    imageUrl: "/assets/images/digital art.jpg",
                    slug: "digital-art",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }}
                  className="h-[400px]"
                />
                <CategoryCard 
                  key="sculptures"
                  category={{
                    id: "2",
                    name: "Sculptures",
                    description: "3D artworks and sculptures",
                    imageUrl: "/assets/images/sculptures.jpg",
                    slug: "sculptures",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }}
                  className="h-[400px]"
                />
                <CategoryCard 
                  key="literature"
                  category={{
                    id: "3",
                    name: "Literature",
                    description: "Written artistry",
                    imageUrl: "/assets/images/literature.jpg",
                    slug: "literature",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }}
                  className="h-[400px]"
                />
                <CategoryCard 
                  key="fashion"
                  category={{
                    id: "4",
                    name: "Fashion Design",
                    description: "Contemporary fashion",
                    imageUrl: "/assets/images/fashion design.jpg",
                    slug: "fashion-design",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  }}
                  className="h-[400px]"
                />
              </div>
            </div>
          </div>
        </Section>
        
        {/* Events Section */}
        <Section 
          contentClassName="flex flex-col gap-16"
          className="section-padding py-24 bg-[#FFFFFF]"
        >
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-7xl font-bold tracking-tight mb-8">Upcoming Events</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Which event ignites your curiosity? Click to explore dates, tickets, and featured artists—and let art move you in person!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative group h-[600px] rounded-lg overflow-hidden">
              <img 
                src="/assets/images/Inspiration.jpg"
                alt="Exhibition Event"
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center bg-black/60">
                <div>
                  <h3 className="font-medium text-lg text-white mb-2">Spring Exhibition</h3>
                  <p className="text-sm text-white/90">Celebrating new artistic voices</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="relative group h-[290px] rounded-lg overflow-hidden">
                <img 
                  src="/assets/images/Hermes.jpg"
                  alt="Workshop Event"
                  className="w-full h-full object-cover scale-125 transition-transform duration-700 ease-out group-hover:scale-[1.35]"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center bg-black/60">
                  <div>
                    <h3 className="font-medium text-lg text-white mb-2">Artist Workshop</h3>
                    <p className="text-sm text-white/90">Learn from the masters</p>
                  </div>
                </div>
              </div>

              <div className="relative group h-[290px] rounded-lg overflow-hidden">
                <img 
                  src="/assets/images/yes.jpg"
                  alt="Community Event"
                  className="w-full h-full object-cover scale-125 transition-transform duration-700 ease-out group-hover:scale-[1.35]"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center bg-black/60">
                  <div>
                    <h3 className="font-medium text-lg text-white mb-2">Community Meet</h3>
                    <p className="text-sm text-white/90">Connect with artists</p>
                  </div>
                </div>
              </div>

              <div className="relative group h-[290px] rounded-lg overflow-hidden">
                <img 
                  src="/assets/images/performative art icon.jpg"
                  alt="Art Talk Event"
                  className="w-full h-full object-cover scale-125 transition-transform duration-700 ease-out group-hover:scale-[1.35]"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center bg-black/60">
                  <div>
                    <h3 className="font-medium text-lg text-white mb-2">Art Talks</h3>
                    <p className="text-sm text-white/90">Inspiring discussions</p>
                  </div>
                </div>
              </div>

              <div className="relative group h-[290px] rounded-lg overflow-hidden">
                <img 
                  src="/assets/images/printmaking icon.jpg"
                  alt="Gallery Opening"
                  className="w-full h-full object-cover scale-125 transition-transform duration-700 ease-out group-hover:scale-[1.35]"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center bg-black/60">
                  <div>
                    <h3 className="font-medium text-lg text-white mb-2">Gallery Opening</h3>
                    <p className="text-sm text-white/90">New exhibitions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  )
}
