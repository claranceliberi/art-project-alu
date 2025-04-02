import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'

export function Home() {
  return (
    <div>
      <Section className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Art Gallery</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover unique artworks from talented artists around the world. Browse our curated collection and find the perfect piece for your space.
        </p>
        <Button asChild size="lg">
          <Link to="/browse">Browse Artworks</Link>
        </Button>
      </Section>

      <Section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Curated Collection</h3>
              <p className="text-muted-foreground">
                Hand-picked artworks from established and emerging artists.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
              <p className="text-muted-foreground">
                Safe and secure payment processing for your peace of mind.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Global Artists</h3>
              <p className="text-muted-foreground">
                Connect with talented artists from around the world.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-12">Ready to Get Started?</h2>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" variant="default">
              <Link to="/browse">Browse Artworks</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/artists">Meet Our Artists</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
} 