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
    imageUrl: "/src/assets/images/download (46).jpg"
  },
  {
    title: "Artist",
    description: "Celebrating creative visionaries",
    imageUrl: "/src/assets/images/download (45).jpg"
  },
  {
    title: "Avenue",
    description: "Creative content and design excellence",
    imageUrl: "/src/assets/images/e90dd457-abf3-40d6-86bc-270fda5e5fc7.jpg"
  }
]

// Collection data
const leftSideCollections = [
  {
    title: "Digital Art",
    description: "Exploring digital frontiers",
    imageUrl: "/src/assets/images/download (48).jpg"
  },
  {
    title: "Photography",
    description: "Capturing moments",
    imageUrl: "/src/assets/images/download (47).jpg"
  },
  {
    title: "Fashion",
    description: "Style in motion",
    imageUrl: "/src/assets/images/download (46).jpg"
  },
  {
    title: "Portrait",
    description: "Human expression",
    imageUrl: "/src/assets/images/download (45).jpg"
  },
  {
    title: "Abstract",
    description: "Beyond reality",
    imageUrl: "/src/assets/images/download (44).jpg"
  },
  {
    title: "Modern",
    description: "Contemporary vision",
    imageUrl: "/src/assets/images/download (43).jpg"
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
          className="section-padding py-24 bg-[#ffffff]"
        >
          <div className="flex flex-col lg:flex-row gap-16 items-start bg-[#ffffff] min-h-[800px]">
            <div className="relative w-full lg:w-[600px] flex-shrink-0">
              <div className="grid grid-cols-2 gap-8 h-[800px]">
                {leftSideCollections.map((collection, index) => (
                  <CollectionCard 
                    key={index}
                    title={collection.title}
                    description={collection.description}
                    imageUrl={collection.imageUrl}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-16 flex-1 bg-[#ffffff]">
              <div className="lg:pt-48">
                <h2 className="text-7xl font-bold tracking-tight mb-8">Collections</h2>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Discover our most sought-after digital art pieces. These carefully curated collections represent the pinnacle of contemporary digital expression, showcasing the most coveted works in our gallery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full bg-[#ffffff] mt-auto">
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
          className="section-padding py-24 bg-[#ffffff]"
        >
          <div className="flex flex-col min-h-[800px]">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-1">
                  <h2 className="text-7xl font-bold tracking-tight mb-8">Browse by Category</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                    Immerse yourself in our diverse world of artistic expression. From traditional paintings to cutting-edge digital art, each category represents a unique perspective in contemporary creativity. Our carefully curated selections showcase both emerging talents and established masters, offering you an unparalleled journey through various mediums, styles, and artistic movements. Whether you're drawn to the tactile nature of sculptures, the emotional depth of photography, or the innovative spirit of digital art, find your perfect piece among our extensive collection.
                  </p>
                </div>
                <div className="w-full lg:w-[500px] h-[500px] flex-shrink-0">
                  <img 
                    src="/src/assets/images/digital art.jpg"
                    alt="Digital Art Expression"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 w-full">
                {categories.map(category => (
                  <CategoryCard 
                    key={category.id} 
                    category={category}
                    className="h-[300px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>
        
        {/* Featured Artists */}
        <Section 
          title="Featured Artists"
          subtitle="Get to know the talented creatives behind our curated collection."
          contentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          className="section-padding"
        >
          {featuredArtists.map(artist => (
            <ArtistCard 
              key={artist.id} 
              artist={artist}
              className="card-hover"
            />
          ))}
          
          <div className="col-span-full mt-8 text-center">
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link to="/artists">View All Artists</Link>
            </Button>
          </div>
        </Section>
      </div>
    </Layout>
  )
}
