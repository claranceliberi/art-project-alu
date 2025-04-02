
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-subtle py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container px-6 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium transition-opacity hover:opacity-80"
        >
          <span className="font-bold tracking-tight">Artistry</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/browse">Browse</NavLink>
          <NavLink to="/artists">Artists</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        
        <div className="flex items-center space-x-5">
          <Button variant="ghost" size="icon" className="transition-opacity hover:opacity-70">
            <Search size={20} className="text-foreground" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="transition-opacity hover:opacity-70">
              <ShoppingCart size={20} className="text-foreground" />
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="ghost" size="icon" className="transition-opacity hover:opacity-70">
              <User size={20} className="text-foreground" />
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden transition-opacity hover:opacity-70"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} className="text-foreground" />
          </Button>
        </div>
        
        {/* Mobile menu */}
        <div 
          className={cn(
            "fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out flex flex-col",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex justify-between items-center p-6 border-b">
            <span className="font-bold text-xl tracking-tight">Artistry</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </Button>
          </div>
          
          <div className="flex flex-col px-6 py-8 space-y-6">
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/browse" onClick={() => setIsMobileMenuOpen(false)}>Browse</MobileNavLink>
            <MobileNavLink to="/artists" onClick={() => setIsMobileMenuOpen(false)}>Artists</MobileNavLink>
            <MobileNavLink to="/categories" onClick={() => setIsMobileMenuOpen(false)}>Categories</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</MobileNavLink>
            <MobileNavLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</MobileNavLink>
          </div>
          
          <div className="mt-auto p-6 border-t">
            <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
              Browse Artworks
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link 
      to={to} 
      className="text-lg font-medium py-2"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
