import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { Artwork } from '@/services/artwork.service'
import { Button } from '@/components/ui/button'
import { LazyImage } from './LazyImage'
import { cn, formatPrice, generateArtworkUrl } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

interface ArtworkCardProps {
  artwork: Artwork
  variant?: 'default' | 'horizontal' | 'featured'
  className?: string
}

export function ArtworkCard({ 
  artwork, 
  variant = 'default',
  className 
}: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const artworkUrl = generateArtworkUrl(artwork)
  const { addToCart } = useCart()
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    addToCart(artwork);
    toast.success('Added to cart');
  };
  
  if (variant === 'featured') {
    return (
      <div 
        className={cn(
          "group relative overflow-hidden rounded-lg shadow-subtle",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={artworkUrl}>
          <LazyImage 
            src={artwork.imageUrl} 
            alt={artwork.title}
            aspectRatio="4/3"
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-80" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="block text-xs font-medium mb-1 text-white/90">
              {artwork.categoryName}
            </span>
            <h3 className="text-xl font-semibold mb-1">{artwork.title}</h3>
            <p className="text-sm text-white/90 mb-3">by {artwork.artistName}</p>
            <div className="flex justify-between items-center">
              <span className="font-medium">{formatPrice(artwork.price)}</span>
              
              {artwork.isSold ? (
                <span className="text-sm font-medium text-white/90">Sold</span>
              ) : (
                <Button 
                  variant="secondary" 
                  size="sm"
                  className={cn(
                    "bg-white text-primary py-1 px-3 rounded-full text-xs font-medium transition-opacity",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </Link>
      </div>
    )
  }
  
  if (variant === 'horizontal') {
    return (
      <div 
        className={cn(
          "group flex rounded-lg overflow-hidden shadow-subtle hover-lift",
          className
        )}
      >
        <Link to={artworkUrl} className="flex w-full">
          <div className="w-1/3 flex-shrink-0">
            <LazyImage 
              src={artwork.imageUrl} 
              alt={artwork.title}
              aspectRatio="1/1"
            />
          </div>
          
          <div className="w-2/3 p-4 flex flex-col">
            <span className="text-xs text-muted-foreground">{artwork.categoryName}</span>
            <h3 className="font-medium mt-1 mb-1">{artwork.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">by {artwork.artistName}</p>
            <div className="mt-auto flex justify-between items-center">
              <span className="font-medium">{formatPrice(artwork.price)}</span>
              
              {artwork.isSold ? (
                <span className="text-xs font-medium text-muted-foreground">Sold</span>
              ) : (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-xs"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </Link>
      </div>
    )
  }
  
  // Default card
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg hover-lift",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={artworkUrl}>
        <div className="relative">
          <LazyImage 
            src={artwork.imageUrl} 
            alt={artwork.title}
            aspectRatio="3/4"
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full w-8 h-8 bg-white/80 text-foreground hover:bg-white"
            >
              <Heart size={16} />
            </Button>
            
            {!artwork.isSold && (
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full w-8 h-8 bg-white/80 text-foreground hover:bg-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={16} />
              </Button>
            )}
          </div>
          
          {artwork.isSold && (
            <div className="absolute top-3 left-3 bg-foreground/90 text-background text-xs font-medium py-1 px-2 rounded">
              Sold
            </div>
          )}
        </div>
        
        <div className="p-3">
          <span className="block text-xs text-muted-foreground">{artwork.categoryName}</span>
          <h3 className="font-medium mt-1 truncate">{artwork.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">by {artwork.artistName}</p>
          <div className="flex justify-between items-center">
            <span className="font-medium">{formatPrice(artwork.price)}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
