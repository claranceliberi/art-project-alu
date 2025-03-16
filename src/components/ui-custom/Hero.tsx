
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroProps {
  className?: string
  bgImage?: string
}

export function Hero({ 
  className,
  bgImage = 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=2000&q=80'
}: HeroProps) {
  return (
    <div 
      className={cn(
        "relative min-h-[80vh] flex items-center",
        className
      )}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl animate-slide-up">
          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium mb-4">
            Discover Unique Artworks
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Discover and collect exceptional artwork
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            Explore a curated selection of contemporary art from emerging and established artists around the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/browse">Explore Collection</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link to="/artists">Meet the Artists</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
