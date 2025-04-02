import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, cartService } from '@/services/cart.service';
import { Artwork } from '@/services/artwork.service';

interface CartContextType {
  items: CartItem[];
  addToCart: (artwork: Artwork, quantity?: number) => void;
  removeFromCart: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage on mount
    setItems(cartService.getCart());
  }, []);

  const addToCart = (artwork: Artwork, quantity: number = 1) => {
    const updatedCart = cartService.addToCart(artwork, quantity);
    setItems(updatedCart);
  };

  const removeFromCart = (artworkId: string) => {
    const updatedCart = cartService.removeFromCart(artworkId);
    setItems(updatedCart);
  };

  const updateQuantity = (artworkId: string, quantity: number) => {
    const updatedCart = cartService.updateQuantity(artworkId, quantity);
    setItems(updatedCart);
  };

  const clearCart = () => {
    cartService.clearCart();
    setItems([]);
  };

  const getTotalItems = () => cartService.getTotalItems();
  const getTotalPrice = () => cartService.getTotalPrice();

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 