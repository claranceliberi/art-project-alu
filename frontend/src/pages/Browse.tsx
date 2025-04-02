import { useState, useEffect } from 'react'
import { Section } from '@/components/ui-custom/Section'
import { ArtworkCard } from '@/components/ui-custom/ArtworkCard'
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
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import type { InfiniteData } from '@tanstack/react-query'
import { artworkService, type Artwork, type ArtworkResponse } from '@/services/artwork.service'
import { categoryService, type Category } from '@/services/category.service'
import { Skeleton } from '@/components/ui/skeleton'
import { useInView } from 'react-intersection-observer'
import { ErrorBoundary } from '@/components/ErrorBoundary'

type SortOption = 'newest' | 'price-low-high' | 'price-high-low'

const ITEMS_PER_PAGE = 12;

function BrowseContent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000])
  const [sort, setSort] = useState<SortOption>('newest')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  const { ref: loadMoreRef, inView } = useInView();
  
  // Fetch categories
  const { 
    data: categories = [], 
    isLoading: isLoadingCategories,
    error: categoriesError 
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });

  const categoriesData = categories || [];

  // Fetch artworks with infinite scroll
  const {
    data: artworksData,
    isLoading: isLoadingArtworks,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: artworksError
  } = useInfiniteQuery<ArtworkResponse, Error, InfiniteData<ArtworkResponse>, [string, string[], [number, number], SortOption, boolean], number>({
    queryKey: ['artworks', selectedCategories, priceRange, sort, availableOnly],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await artworkService.getAll({
        page: pageParam,
        limit: ITEMS_PER_PAGE,
        categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort: sort === 'newest' ? 'createdAt:desc' :
              sort === 'price-low-high' ? 'price:asc' : 'price:desc',
        available: availableOnly ? true : undefined,
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const totalPages = Math.ceil(lastPage.total / ITEMS_PER_PAGE);
      if (lastPage.page < totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
  
  // Load more when scrolling to the bottom
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  
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
  
  // Safely combine all pages of artworks
  const allArtworks = artworksData?.pages?.reduce<Artwork[]>((acc, page) => {
    if (page?.artworks) {
      return [...acc, ...page.artworks];
    }
    return acc;
  }, []) || [];

  // Safely get total count
  const totalArtworks = artworksData?.pages?.[0]?.total || 0;
  
  const isLoading = isLoadingCategories || isLoadingArtworks;
  
  return (
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
              <span className="text-sm font-medium">
                {isLoading ? 'Loading...' : `${totalArtworks} artworks`}
              </span>
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
                {isLoadingCategories ? (
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-6" />
                    ))}
                  </div>
                ) : categoriesError ? (
                  <div className="text-sm text-destructive">
                    Error loading categories. Please try again.
                  </div>
                ) : categoriesData.length > 0 ? (
                  <div className="space-y-2">
                    {categoriesData.map(category => (
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
                ) : (
                  <p className="text-sm text-muted-foreground">No categories available</p>
                )}
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
                  onValueChange={(value: number[]) => setPriceRange([value[0], value[1]])}
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
            {isLoadingArtworks && !isFetchingNextPage ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : artworksError ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Error Loading Artworks</h3>
                <p className="text-muted-foreground mb-6">
                  {artworksError instanceof Error ? artworksError.message : 'An error occurred while loading artworks.'}
                </p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            ) : allArtworks.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No artworks found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allArtworks.map(artwork => (
                    <ArtworkCard 
                      key={artwork.id} 
                      artwork={artwork}
                    />
                  ))}
                </div>
                
                {/* Load More Trigger */}
                {hasNextPage && (
                  <div
                    ref={loadMoreRef}
                    className="flex justify-center mt-8"
                  >
                    {isFetchingNextPage ? (
                      <div className="space-y-4">
                        <Skeleton className="h-8 w-32" />
                      </div>
                    ) : (
                      <Button variant="outline" onClick={() => fetchNextPage()}>
                        Load More
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Browse() {
  return (
    <ErrorBoundary>
      <BrowseContent />
    </ErrorBoundary>
  );
}
