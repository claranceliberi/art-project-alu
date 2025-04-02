import React from 'react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import type { Artwork } from '@/services/artwork.service';

interface ArtworkCardProps {
  artwork: Artwork;
  addToCart: (artwork: Artwork) => void;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, addToCart }) => {
  const isSoldOut = artwork.quantity === 0;

  return (
    <div className="p-4">
      <h3 className="font-medium truncate">{artwork.title}</h3>
      <p className="text-sm text-muted-foreground truncate">by {artwork.artistName}</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="font-medium">{formatPrice(artwork.price)}</p>
          <p className="text-sm text-muted-foreground">
            {isSoldOut ? 'Sold out' : `${artwork.quantity} available`}
          </p>
        </div>
        <Button
          onClick={() => addToCart(artwork)}
          disabled={isSoldOut}
          variant="secondary"
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ArtworkCard; 