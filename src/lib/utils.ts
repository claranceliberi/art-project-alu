
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function generateArtworkUrl(artwork: { id: string; title: string }): string {
  const slug = artwork.title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
  return `/artwork/${artwork.id}/${slug}`
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Simulates loading an image and tracking when it's done
export function preloadImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}
