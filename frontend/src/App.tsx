import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Layout } from '@/components/layout/Layout'
import Index from '@/pages/Index'
import Browse from '@/pages/Browse'
import Artists from '@/pages/Artists'
import About from '@/pages/About'
import Explore from '@/pages/Explore'
import Activity from '@/pages/Activity'
import ManageArtworks from '@/pages/ManageArtworks'
import UploadArtwork from '@/pages/UploadArtwork'
import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { SignIn } from '@/pages/auth/SignIn'
import { SignUp } from '@/pages/auth/SignUp'
import { useAuth } from '@/contexts/AuthContext'

const queryClient = new QueryClient()

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/signin" />
}

function ArtistRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user?.role === 'artist' ? <>{children}</> : <Navigate to="/signin" />
}

// Layout wrapper component that includes the Outlet
function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Auth routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/login" element={<Navigate to="/signin" />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Main layout routes */}
              <Route element={<LayoutWrapper />}>
                <Route path="/" element={<Index />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/about" element={<About />} />
                
                {/* Artist routes */}
                <Route
                  path="/manage-artworks"
                  element={
                    <ArtistRoute>
                      <ManageArtworks />
                    </ArtistRoute>
                  }
                />
                <Route
                  path="/upload-artwork"
                  element={
                    <ArtistRoute>
                      <UploadArtwork />
                    </ArtistRoute>
                  }
                />
                <Route
                  path="/edit-artwork/:id"
                  element={
                    <ArtistRoute>
                      <div>Edit Artwork Page (TODO)</div>
                    </ArtistRoute>
                  }
                />

                {/* Protected routes */}
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <div>Profile Page (TODO)</div>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <div>Orders Page (TODO)</div>
                    </PrivateRoute>
                  }
                />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}
