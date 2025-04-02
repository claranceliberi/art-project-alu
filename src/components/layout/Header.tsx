import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MobileNavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block py-2 text-lg ${
        isActive ? "text-black font-medium" : "text-gray-500 hover:text-black"
      }`
    }
  >
    {children}
  </NavLink>
)

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
          <span className="font-bold tracking-tight">MONET MAKERS</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-lg ${isActive ? "text-black font-medium" : "text-gray-500 hover:text-black"}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/browse" 
            className={({ isActive }) => 
              `text-lg ${isActive ? "text-black font-medium" : "text-gray-500 hover:text-black"}`
            }
          >
            Browse
          </NavLink>
          <NavLink 
            to="/explore" 
            className={({ isActive }) => 
              `text-lg ${isActive ? "text-black font-medium" : "text-gray-500 hover:text-black"}`
            }
          >
            Explore
          </NavLink>
          <NavLink 
            to="/activity" 
            className={({ isActive }) => 
              `text-lg ${isActive ? "text-black font-medium" : "text-gray-500 hover:text-black"}`
            }
          >
            Activity
          </NavLink>
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
            {isMobileMenuOpen ? (
              <X size={20} className="text-foreground" />
            ) : (
              <Menu size={20} className="text-foreground" />
            )}
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/browse" onClick={() => setIsMobileMenuOpen(false)}>
              Browse
            </MobileNavLink>
            <MobileNavLink to="/explore" onClick={() => setIsMobileMenuOpen(false)}>
              Explore
            </MobileNavLink>
            <MobileNavLink to="/activity" onClick={() => setIsMobileMenuOpen(false)}>
              Activity
            </MobileNavLink>
          </div>
        )}
      </div>
    </header>
  )
}
