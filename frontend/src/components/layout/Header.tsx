import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { User } from 'lucide-react'

export function Header() {
  const { user, signout } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signout()
    navigate('/signin')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold">
          MONET MAKERS
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/browse" className="text-sm hover:text-primary">
            Browse
          </Link>
          <Link to="/explore" className="text-sm hover:text-primary">
            Explore
          </Link>
          <Link to="/artists" className="text-sm hover:text-primary">
            Artists
          </Link>
          <Link to="/about" className="text-sm hover:text-primary">
            About
          </Link>
          {user?.role === 'artist' && (
            <Link to="/manage-artworks" className="text-sm hover:text-primary">
              My Artworks
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {user.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user.role === 'artist' && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/manage-artworks">Manage Artworks</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/upload-artwork">Upload Artwork</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
