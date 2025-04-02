import { Artwork } from './artwork.service';

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

const CART_STORAGE_KEY = 'art-marketplace-cart';

export const cartService = {
  getCart: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  addToCart: (artwork: Artwork, quantity: number = 1): CartItem[] => {
    const cart = cartService.getCart();
    const existingItem = cart.find(item => item.artwork.id === artwork.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ artwork, quantity });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return cart;
  },

  removeFromCart: (artworkId: string): CartItem[] => {
    const cart = cartService.getCart();
    const updatedCart = cart.filter(item => item.artwork.id !== artworkId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
  },

  updateQuantity: (artworkId: string, quantity: number): CartItem[] => {
    const cart = cartService.getCart();
    const item = cart.find(item => item.artwork.id === artworkId);
    
    if (item) {
      item.quantity = Math.max(1, quantity);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
    
    return cart;
  },

  clearCart: (): void => {
    localStorage.removeItem(CART_STORAGE_KEY);
  },

  getTotalItems: (): number => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: (): number => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + (Number(item.artwork.price) * item.quantity), 0);
  }
}; 