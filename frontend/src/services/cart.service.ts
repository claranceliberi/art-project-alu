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
      // Check if adding more would exceed available quantity
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity <= artwork.quantity) {
        existingItem.quantity = newQuantity;
      } else {
        throw new Error(`Cannot add more items than available (${artwork.quantity})`);
      }
    } else {
      // Check if initial quantity is available
      if (quantity <= artwork.quantity) {
        cart.push({ artwork, quantity });
      } else {
        throw new Error(`Cannot add more items than available (${artwork.quantity})`);
      }
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
      // Check if new quantity is available
      if (quantity <= item.artwork.quantity) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } else {
        throw new Error(`Cannot set quantity higher than available (${item.artwork.quantity})`);
      }
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