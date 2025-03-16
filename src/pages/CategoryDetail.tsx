
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui-custom/Section";
import { ArtworkCard } from "@/components/ui-custom/ArtworkCard";
import { categories, artworks } from "@/lib/data";
import { useEffect } from "react";

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the category based on the slug
  const category = categories.find(cat => cat.slug === slug);
  
  // Filter artworks by the category
  const categoryArtworks = artworks.filter(
    artwork => category && artwork.categoryId === category.id
  );

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        {categoryArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {categoryArtworks.map((artwork) => (
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
