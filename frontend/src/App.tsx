import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Browse } from '@/pages/Browse'
import { Artists } from '@/pages/Artists'
import { About } from '@/pages/About'
import { Checkout } from '@/pages/Checkout'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import { SignIn } from './pages/auth/SignIn'
import { SignUp } from './pages/auth/SignUp'
import { ArtworkManagement } from './pages/artist/ArtworkManagement'
import { useAuth } from './contexts/AuthContext'

const queryClient = new QueryClient()

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/signin" />
}

function ArtistRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user?.role === 'artist' ? <>{children}</> : <Navigate to="/" />
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/about" element={<About />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/artist/artworks"
                  element={
                    <PrivateRoute>
                      <ArtistRoute>
                        <ArtworkManagement />
                      </ArtistRoute>
                    </PrivateRoute>
                  }
                />
              </Route>
            </Routes>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}
