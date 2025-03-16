
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/ui-custom/Hero'
import { Section } from '@/components/ui-custom/Section'
import { ArtworkCard } from '@/components/ui-custom/ArtworkCard'
import { ArtistCard } from '@/components/ui-custom/ArtistCard'
import { CategoryCard } from '@/components/ui-custom/CategoryCard'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { artworks, featuredArtists, categories } from '@/lib/data'

export default function Index() {
  // Get featured artworks
  const featuredArtworks = artworks.filter(artwork => artwork.isFeatured)
  
  return (
    <Layout>
      <div className="page-transition">
        <Hero />
        
        {/* Featured Artworks */}
        <Section 
          title="Featured Artworks"
          subtitle="Discover our latest selection of exceptional pieces carefully curated for collectors and enthusiasts."
          contentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredArtworks.slice(0, 3).map(artwork => (
            <ArtworkCard 
              key={artwork.id} 
              artwork={artwork}
              variant="featured"
            />
          ))}
          
          <div className="col-span-full mt-8 text-center">
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link to="/browse">View All Artworks</Link>
            </Button>
          </div>
        </Section>
        
        {/* Browse by Category */}
        <Section 
          title="Browse by Category"
          subtitle="Explore artworks across different mediums and styles."
          contentClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          className="bg-secondary py-16"
        >
          {categories.map(category => (
            <CategoryCard 
              key={category.id} 
              category={category}
            />
          ))}
        </Section>
        
        {/* Featured Artists */}
        <Section 
          title="Featured Artists"
          subtitle="Get to know the talented creatives behind our curated collection."
          contentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredArtists.map(artist => (
            <ArtistCard 
              key={artist.id} 
              artist={artist}
            />
          ))}
          
          <div className="col-span-full mt-8 text-center">
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link to="/artists">View All Artists</Link>
            </Button>
          </div>
        </Section>
        
        {/* Collection Highlight */}
        <Section className="bg-warm-gradient py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1579783900513-23d9bdb36b09?auto=format&fit=crop&w=800&q=80" 
                alt="Contemporary Art Collection" 
                className="rounded-lg shadow-elevated"
              />
            </div>
            
            <div className="md:w-1/2">
              <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium mb-4">
                New Collection
              </span>
              
              <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight">
                Contemporary Expressions
              </h2>
              
              <p className="text-muted-foreground mb-8">
                Our latest collection showcases bold expressions from emerging artists who are redefining contemporary art. Each piece tells a unique story about our changing world and human experience.
              </p>
              
              <Button asChild className="rounded-full px-6">
                <Link to="/collections/contemporary">Explore Collection</Link>
              </Button>
            </div>
          </div>
        </Section>
        
        {/* Newsletter */}
        <Section className="bg-foreground text-background py-24">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-medium mb-6">Join Our Community</h2>
            <p className="text-background/80 mb-8">
              Subscribe to receive updates on new artworks, artist features, and exclusive previews of upcoming collections.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-background placeholder:text-background/60 flex-1 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button className="rounded-full bg-background text-foreground hover:bg-background/90">
                Subscribe
              </Button>
            </form>
          </div>
        </Section>
      </div>
    </Layout>
  )
}
