import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface Artwork {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
  quantity: string;
  artistId: string;
  artistName: string;
  thumbnailUrl: string;
  medium: string;
  dimensions: {
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  categoryName: string;
  year: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ArtworkCardProps {
  artwork: Artwork;
  showActions?: boolean;
}

export function ArtworkCard({ artwork, showActions = true }: ArtworkCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    addToCart({
      id: artwork.id,
      title: artwork.title,
      description: artwork.description,
      imageUrl: artwork.imageUrl,
      thumbnailUrl: artwork.thumbnailUrl,
      price: parseFloat(artwork.price),
      quantity: parseInt(artwork.quantity),
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      categoryId: artwork.categoryId,
      categoryName: artwork.categoryName,
      artistId: artwork.artistId,
      artistName: artwork.artistName,
      year: artwork.year,
      isFeatured: artwork.isFeatured,
      createdAt: artwork.createdAt,
      updatedAt: artwork.updatedAt,
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{artwork.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {artwork.description}
        </p>
        <p className="text-lg font-semibold mt-2">${artwork.price}</p>
      </CardContent>
      {showActions && user?.role !== 'artist' && (
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={parseInt(artwork.quantity) <= 0}
          >
            {parseInt(artwork.quantity) > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 