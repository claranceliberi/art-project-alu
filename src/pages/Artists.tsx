import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui-custom/Section";
import { ArtistCard } from "@/components/ui-custom/ArtistCard";
import { useEffect } from "react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { artistService } from "@/services/artist.service";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function ArtistsContent() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch artists
  const { data: artists = [], isLoading, error } = useQuery({
    queryKey: ['artists'],
    queryFn: () => artistService.getAll(),
  });

  if (isLoading) {
    return (
      <Layout>
        <Section title="Featured Artists" subtitle="Discover talented artists from around the world">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </Section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Section title="Featured Artists" subtitle="Discover talented artists from around the world">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">Error Loading Artists</h3>
            <p className="text-muted-foreground mb-6">
              {error instanceof Error ? error.message : 'An error occurred while loading artists.'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section title="Featured Artists" subtitle="Discover talented artists from around the world">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
        
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Section>
    </Layout>
  );
}

export  function Artists() {
  return (
    <ErrorBoundary>
      <ArtistsContent />
    </ErrorBoundary>
  );
}
