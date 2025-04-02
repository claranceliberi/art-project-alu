import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui-custom/Section";
import { ArtworkCard } from "@/components/ui-custom/ArtworkCard";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import { artworkService } from "@/services/artwork.service";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  // Convert slug back to category name
  const categoryName = slug?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['category', categoryName],
    queryFn: () => categoryService.getByName(categoryName || ''),
    enabled: !!categoryName,
  });

  const { data: categoryArtworks, isLoading: isLoadingArtworks } = useQuery({
    queryKey: ['artworks', category?.id],
    queryFn: () => artworkService.getByCategory(category?.id || ''),
    enabled: !!category?.id,
  });

  // Transform API response to match expected type
  const transformedArtworks = categoryArtworks?.map(artwork => ({
    ...artwork,
    categoryName: category?.name || '',
    isSold: false, // Default value if not provided by API
    isFeatured: false, // Default value if not provided by API
    thumbnailUrl: artwork.imageUrl, // Use main image as thumbnail if not provided
    dimensions: typeof artwork.dimensions === 'string' 
      ? { width: 0, height: 0, unit: 'cm' as const } // Default dimensions if string
      : {
          ...artwork.dimensions,
          unit: artwork.dimensions.unit === 'cm' || artwork.dimensions.unit === 'in'
            ? artwork.dimensions.unit
            : 'cm' as const
        },
  }));

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoadingCategory || isLoadingArtworks) {
    return (
      <Layout>
        <Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </Section>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <Section>
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Category Not Found</h2>
            <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section title={category.name} subtitle={`Explore our collection of ${category.name.toLowerCase()} artwork`}>
        {transformedArtworks && transformedArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {transformedArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No artworks found in this category.</p>
          </div>
        )}
      </Section>
    </Layout>
  );
}
