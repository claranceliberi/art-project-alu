# Art Marketplace Frontend

A modern web application for browsing, buying, and selling artworks. Built with Next.js and TypeScript.

## Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Shadcn/ui
  - Radix UI
  - Lucide Icons
- **State Management**: React Query
- **Form Handling**: React Hook Form & Zod
- **Authentication**: JWT with HTTP-only cookies
- **Image Handling**: Cloudinary
- **Deployment**: Vercel

## Features

- **User Authentication**
  - Sign up/Sign in
  - Profile management
  - Role-based access (Admin/Artist/Buyer)

- **Artwork Management**
  - Browse artworks with filtering and search
  - Upload and manage artworks (for artists)
  - Image upload with preview
  - Category-based organization

- **Shopping Experience**
  - Add to cart functionality
  - Secure checkout process
  - Order history
  - Transaction management

- **Admin Features**
  - User management
  - Category management
  - Transaction oversight
  - Analytics dashboard

## Project Structure

```
src/
├── app/             # Next.js app router pages
├── components/      # Reusable UI components
├── lib/            # Utility functions and configurations
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
└── styles/         # Global styles and Tailwind config
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in:
   - `NEXT_PUBLIC_API_URL`: Backend API URL
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Cloudinary upload preset

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

## Development

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Format**: `npm run format`
- **Type Check**: `npm run typecheck`

## User Flows

### Artist Flow
1. Sign up/Sign in as an artist
2. Set up artist profile
3. Upload artworks with details
4. Manage artwork listings
5. View sales history

### Buyer Flow
1. Browse artwork catalog
2. Filter by category/price
3. View artwork details
4. Add to cart
5. Complete purchase
6. View order history

### Admin Flow
1. Access admin dashboard
2. Manage user accounts
3. Create/edit categories
4. Monitor transactions
5. View platform analytics

## Deployment

The application is deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy:
   ```bash
   vercel --prod
   ```

## API Integration

The frontend communicates with the backend API at:
- Development: `http://localhost:3000/api`
- Production: `https://api-icy-sea-7991.fly.dev`

## Performance Considerations

- Images are optimized using Next.js Image component
- API responses are cached using React Query
- Server-side rendering for SEO and performance
- Lazy loading for better initial load time
