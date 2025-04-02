
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { LazyImage } from '@/components/ui-custom/LazyImage'
import { ArtworkCard } from '@/components/ui-custom/ArtworkCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Heart, Share, Maximize, ShoppingCart } from 'lucide-react'
import { artworks } from '@/lib/data'
import { formatPrice, cn } from '@/lib/utils'

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>()
  const [isZoomed, setIsZoomed] = useState(false)
  const [artwork, setArtwork] = useState(artworks.find(a => a.id === id))
  
  // Get similar artworks by same artist or category
  const similarArtworks = artworks.filter(a => 
    a.id !== id && (a.artistId === artwork?.artistId || a.categoryId === artwork?.categoryId)
  ).slice(0, 3)
  
  useEffect(() => {
    // Update artwork when id changes
    setArtwork(artworks.find(a => a.id === id))
    // Scroll to top
    window.scrollTo(0, 0)
  }, [id])
  
  if (!artwork) {
    return (
      <Layout>
        <div className="container px-6 mx-auto py-16 text-center">
          <h1 className="text-2xl font-medium mb-4">Artwork not found</h1>
          <p className="text-muted-foreground mb-8">
            The artwork you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/browse">Browse Artworks</Link>
          </Button>
        </div>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <div className="page-transition">
        {/* Breadcrumb */}
        <div className="container px-6 mx-auto py-6">
          <Link 
            to="/browse" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} className="mr-1" />
            Back to browse
          </Link>
        </div>
        
        <div className="container px-6 mx-auto pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Artwork Image */}
            <div>
              <div className="relative rounded-lg overflow-hidden bg-muted">
                <div
                  className={cn(
                    "cursor-zoom-in transition-transform duration-500 ease-out",
                    isZoomed && "scale-150"
                  )}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <LazyImage 
                    src={artwork.imageUrl} 
                    alt={artwork.title}
                    aspectRatio="3/4"
                  />
                </div>
                
                {!isZoomed && (
                  <Button 
                    variant="secondary" 
                    size="icon"
                    className="absolute top-4 right-4 rounded-full bg-white/70 hover:bg-white"
                    onClick={() => setIsZoomed(true)}
                  >
                    <Maximize size={18} />
                  </Button>
                )}
              </div>
            </div>
            
            {/* Artwork Details */}
            <div>
              <div className="sticky top-24">
                <span className="text-sm text-muted-foreground">
                  {artwork.categoryName}
                </span>
                
                <h1 className="text-3xl font-medium mt-1 mb-1">{artwork.title}</h1>
                
                <Link 
                  to={`/artists/${artwork.artistId}`}
                  className="text-lg hover:underline"
                >
                  {artwork.artistName}
                </Link>
                
                <div className="flex items-baseline mt-6 mb-8">
                  <span className="text-2xl font-medium">
                    {formatPrice(artwork.price)}
                  </span>
                  
                  {artwork.isSold && (
                    <span className="ml-3 text-sm font-medium px-2 py-1 bg-secondary rounded">
                      Sold
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-3 mb-8">
                  {!artwork.isSold && (
                    <Button className="flex-1" size="lg">
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </Button>
                  )}
                  
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Heart size={18} />
                  </Button>
                  
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share size={18} />
                  </Button>
                </div>
                
                <Separator className="my-8" />
                
                <div className="prose max-w-none mb-8">
                  <h3 className="text-lg font-medium mb-3">About the artwork</h3>
                  <p className="text-muted-foreground mb-6">
                    {artwork.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Medium</p>
                      <p className="text-muted-foreground">{artwork.medium}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Dimensions</p>
                      <p className="text-muted-foreground">
                        {artwork.dimensions.width} × {artwork.dimensions.height} {artwork.dimensions.unit}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Year</p>
                      <p className="text-muted-foreground">{artwork.year}</p>
                    </div>
                  </div>
                </div>
                
                {!artwork.isSold && (
                  <div className="bg-secondary rounded-lg p-6">
                    <h3 className="text-sm font-medium mb-2">Shipping & Returns</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      This artwork ships worldwide. Professional packaging and insurance included.
                    </p>
                    <Link 
                      to="/shipping"
                      className="text-sm font-medium hover:underline"
                    >
                      View shipping details
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Similar Artworks */}
          {similarArtworks.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-medium mb-8">You might also like</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarArtworks.map(artwork => (
                  <ArtworkCard 
                    key={artwork.id} 
                    artwork={artwork}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
