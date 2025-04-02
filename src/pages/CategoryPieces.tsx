import { useParams, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui-custom/Section";
import { ArtworkCard } from "@/components/ui-custom/ArtworkCard";
import { categories, artworks } from "@/lib/data";
import { useEffect, useState } from "react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SortOption = "price-asc" | "price-desc" | "newest" | "oldest";

// Mock data structure for category sections
const categoryArtworks = {
  painting: artworks.slice(0, 6),
  sculptures: artworks.slice(6, 12),
  "performative-art": artworks.slice(12, 18),
  "digital-art": artworks.slice(18, 24),
  animation: artworks.slice(24, 30),
  "fashion-design": artworks.slice(30, 36),
  "web-design": artworks.slice(36, 42),
  drawing: artworks.slice(42, 48),
  "arts-and-crafts": artworks.slice(48, 54),
  jewelry: artworks.slice(54, 60),
  photography: artworks.slice(60, 66),
  printmaking: artworks.slice(66, 72),
  literature: artworks.slice(72, 78),
};

export default function CategoryPieces() {
  const { slug } = useParams();
  const location = useLocation();
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [searchTerm, setSearchTerm] = useState("");
  
  // Find the category based on the slug
  const category = categories.find(cat => cat.slug === slug);
  
  // Filter artworks by the category
  let filteredArtworks = artworks.filter(
    artwork => category && artwork.categoryId === category.id
  );

  // Apply search filter
  if (searchTerm) {
    filteredArtworks = filteredArtworks.filter(artwork => 
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.artistName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply price filter
  if (priceRange.min) {
    filteredArtworks = filteredArtworks.filter(
      artwork => artwork.price >= Number(priceRange.min)
    );
  }
  if (priceRange.max) {
    filteredArtworks = filteredArtworks.filter(
      artwork => artwork.price <= Number(priceRange.max)
    );
  }

  // Apply sorting
  filteredArtworks.sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        return 0;
    }
  });

  useEffect(() => {
    // If a specific category is selected, scroll to its section
    if (slug) {
      const element = document.getElementById(slug);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // If no specific category, scroll to top
      window.scrollTo(0, 0);
    }
  }, [slug]);

  // Find the paintings category
  const paintingsCategory = categories.find(cat => cat.slug === "painting");
  const paintingsArtworks = artworks.filter(
    artwork => artwork.categoryId === paintingsCategory?.id
  );

  // Mock data for painting category
  const paintingData = {
    title: "PAINTING",
    description: "Discover the timeless beauty of painting, where artists transform blank canvases into windows of emotion and storytelling. From classical masterpieces to contemporary expressions, explore how this fundamental art form continues to captivate and inspire across generations.",
    collection: {
      imageUrl: "/src/assets/images/download (22).jpg",
      name: "Renaissance Masters",
      description: "A curated collection of 15th-century Italian paintings",
      pieceCount: 24
    },
    piece: {
      imageUrl: "/src/assets/images/cloth piece.jpg",
      name: "Summer Garden",
      artist: "Maria Gonzalez",
      price: "$2,800"
    }
  };

  if (!slug) {
    return (
      <Layout>
        <Section>
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Category Not Found</h2>
            <p className="text-muted-foreground">Please select a category to view.</p>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-transition">
        {slug === "painting" && (
          <Section 
            contentClassName="flex flex-col gap-16"
            className="section-padding py-24 bg-white"
          >
            <div className="max-w-7xl mx-auto w-full">
              <h1 className="text-7xl font-bold tracking-tight mb-8">{paintingData.title}</h1>
              <p className="text-xl text-gray-600 max-w-4xl">{paintingData.description}</p>
            </div>

            <div className="grid grid-cols-12 gap-8">
              {/* Large Collection Card */}
              <div className="col-span-8 group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer">
                <img 
                  src={paintingData.collection.imageUrl}
                  alt={paintingData.collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-8">
                  <h3 className="font-medium text-2xl text-white mb-2">{paintingData.collection.name}</h3>
                  <p className="text-lg text-white/90 mb-4">{paintingData.collection.description}</p>
                  <span className="text-sm text-white/80">{paintingData.collection.pieceCount} pieces</span>
                </div>
              </div>

              {/* Small Piece Card */}
              <div className="col-span-4 group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer">
                <img 
                  src={paintingData.piece.imageUrl}
                  alt={paintingData.piece.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-6">
                  <h3 className="font-medium text-xl text-white mb-1">{paintingData.piece.name}</h3>
                  <p className="text-sm text-white/90 mb-2">by {paintingData.piece.artist}</p>
                  <span className="text-sm text-white/80">{paintingData.piece.price}</span>
                </div>
              </div>
            </div>
          </Section>
        )}
      </div>
    </Layout>
  );
} 