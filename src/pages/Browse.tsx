
import { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Section } from '@/components/ui-custom/Section'
import { ArtworkCard } from '@/components/ui-custom/ArtworkCard'
import { categories, artworks } from '@/lib/data'
import { cn } from '@/lib/utils'
import { X, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'

type SortOption = 'newest' | 'price-low-high' | 'price-high-low'

export default function Browse() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sort, setSort] = useState<SortOption>('newest')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }
  
  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 3000])
    setAvailableOnly(false)
  }
  
  // Apply filters and sorting
  const filteredArtworks = artworks.filter(artwork => {
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(artwork.categoryId)) {
      return false
    }
    
    // Filter by price
    if (artwork.price < priceRange[0] || artwork.price > priceRange[1]) {
      return false
    }
    
    // Filter by availability
    if (availableOnly && artwork.isSold) {
      return false
    }
    
    return true
  }).sort((a, b) => {
    // Sort by selected option
    if (sort === 'price-low-high') {
      return a.price - b.price
    } else if (sort === 'price-high-low') {
      return b.price - a.price
    } else {
      // Sort by newest (default)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })
  
  return (
    <Layout>
      <div className="page-transition">
        <div className="bg-secondary py-16">
          <div className="container px-6 mx-auto">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-3xl font-medium mb-4">Browse Artworks</h1>
              <p className="text-muted-foreground">
                Explore our curated collection of unique artworks from emerging and established artists.
              </p>
            </div>
          </div>
        </div>
        
        <div className="container px-6 mx-auto py-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="md:hidden flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                Filters
              </Button>
              
              <div className="hidden md:block">
                <span className="text-sm font-medium">{filteredArtworks.length} artworks</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortOption)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div 
              className={cn(
                "w-full md:w-64 flex-shrink-0",
                showFilters ? "block" : "hidden md:block"
              )}
            >
              <div className="sticky top-24 bg-white p-6 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-medium">Filters</h3>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={clearFilters}
                    >
                      Clear all
                    </button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setShowFilters(false)}
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <Slider
                    defaultValue={[0, 3000]}
                    min={0}
                    max={3000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Availability */}
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="available-only"
                      checked={availableOnly}
                      onCheckedChange={(checked) => setAvailableOnly(checked === true)}
                    />
                    <label 
                      htmlFor="available-only"
                      className="text-sm cursor-pointer"
                    >
                      Available artworks only
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Artworks Grid */}
            <div className="flex-1">
              {filteredArtworks.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No artworks found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArtworks.map(artwork => (
                    <ArtworkCard 
                      key={artwork.id} 
                      artwork={artwork}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
