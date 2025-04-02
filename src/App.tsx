import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Browse from "./pages/Browse";
import ArtworkDetail from "./pages/ArtworkDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoryDetail from "./pages/CategoryDetail";
import CategoryPieces from "./pages/CategoryPieces";
import About from "./pages/About";
import Explore from "./pages/Explore";
import Activity from "./pages/Activity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/artwork/:id/*" element={<ArtworkDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories/pieces" element={<CategoryPieces />} />
          <Route path="/categories/pieces/:slug" element={<CategoryPieces />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
