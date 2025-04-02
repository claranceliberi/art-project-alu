import { api } from '@/lib/api-client'
import { API_ENDPOINTS } from '@/lib/endpoints'
import type { CartItem } from '@/contexts/CartContext'

export interface CheckoutData {
  items: CartItem[]
  shippingAddress: {
    fullName: string
    email: string
    address: string
    city: string
    country: string
    postalCode: string
  }
}

export interface CheckoutResponse {
  orderId: string
  status: 'success' | 'pending' | 'failed'
  message: string
  transactionIds: string[]
}

export const checkoutService = {
  async checkout(data: CheckoutData): Promise<CheckoutResponse> {
    // Format the data to match backend expectations
    const formattedData = {
      ...data,
      items: data.items.map(item => ({
        ...item,
        artwork: {
          ...item.artwork,
          price: Number(item.artwork.price), // Convert price to number
          artistName: item.artwork.artistName || 'Unknown Artist' // Ensure artistName is present
        }
      }))
    }
    
    const response = await api.post(API_ENDPOINTS.checkout, formattedData)
    return response.data
  }
} 