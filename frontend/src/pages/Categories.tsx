import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui-custom/Section";
import { CategoryCard } from "@/components/ui-custom/CategoryCard";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import { Skeleton } from "@/components/ui/skeleton";

export default function Categories() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  if (error) {
    console.error('Categories error:', error);
    return (
      <Layout>
        <Section>
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Error Loading Categories</h2>
            <p className="text-muted-foreground mb-4">There was a problem loading the categories. Please try again later.</p>
            {process.env.NODE_ENV === 'development' && (
              <p className="text-sm text-destructive">
                Error: {error instanceof Error ? error.message : 'Unknown error'}
              </p>
            )}
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section title="Browse by Category" subtitle="Explore our extensive collection of artwork categories">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 border border-border rounded-lg">
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            ))
          ) : (
            categories?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))
          )}
        </div>
      </Section>
    </Layout>
  );
}
