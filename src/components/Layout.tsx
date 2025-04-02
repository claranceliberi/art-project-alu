import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartDrawer } from '@/components/ui-custom/CartDrawer'
import { useCart } from '@/contexts/CartContext'

export function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Art Gallery
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/browse" className="text-sm hover:text-primary">
              Browse
            </Link>
            <Link to="/artists" className="text-sm hover:text-primary">
              Artists
            </Link>
            <Link to="/about" className="text-sm hover:text-primary">
              About
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <p className="text-sm text-muted-foreground">
                Art Gallery is a platform for artists to showcase and sell their artwork.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/browse" className="text-sm text-muted-foreground hover:text-primary">
                    Browse Artworks
                  </Link>
                </li>
                <li>
                  <Link to="/artists" className="text-sm text-muted-foreground hover:text-primary">
                    Artists
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">
                  Email: contact@artgallery.com
                </li>
                <li className="text-sm text-muted-foreground">
                  Phone: (555) 123-4567
                </li>
                <li className="text-sm text-muted-foreground">
                  Address: 123 Art Street, Gallery City
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Art Gallery. All rights reserved.
          </div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
} 