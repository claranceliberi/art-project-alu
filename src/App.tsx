import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Browse } from '@/pages/Browse'
import { Artists } from '@/pages/Artists'
import { About } from '@/pages/About'
import { CartProvider } from '@/contexts/CartContext'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
          <Toaster />
        </CartProvider>
      </Router>
    </QueryClientProvider>
  )
}
