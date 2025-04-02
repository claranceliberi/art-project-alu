# Art Marketplace API

The backend service for the Art Marketplace platform, providing RESTful APIs for managing artworks, users, categories, and transactions.

## Technology Stack

- **Runtime**: [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime
- **Framework**: [Hono](https://hono.dev/) - Lightweight, ultrafast web framework
- **Database**: PostgreSQL (via Supabase)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **File Storage**: Cloudinary
- **Authentication**: JWT-based auth
- **API Documentation**: OpenAPI/Swagger
- **Deployment**: Fly.io

## Architecture

The application follows a layered architecture:

```
src/
├── db/          # Database models and configuration
├── routes/      # API route handlers
├── middleware/  # Custom middleware
├── services/    # Business logic
├── utils/       # Helper functions
└── types/       # TypeScript type definitions
```

## API Endpoints

- **Users**: Authentication and user management
  - `POST /api/auth/login`
  - `POST /api/auth/register`
  - `GET /api/users`
  - `GET /api/users/:id`

- **Artworks**: Artwork management
  - `GET /api/artworks`
  - `POST /api/artworks`
  - `GET /api/artworks/:id`
  - `PUT /api/artworks/:id`
  - `DELETE /api/artworks/:id`

- **Categories**: Category management
  - `GET /api/categories`
  - `POST /api/categories`
  - `GET /api/categories/:id`
  - `PUT /api/categories/:id`

- **Transactions**: Purchase management
  - `POST /api/transactions`
  - `GET /api/transactions`
  - `GET /api/transactions/:id`

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd api
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in the following variables in `.env`:
   - `DATABASE_URL`: Supabase PostgreSQL connection string
   - `SUPABASE_URL`: Supabase project URL
   - `SUPABASE_ANON_KEY`: Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
   - `JWT_SECRET`: Secret for JWT signing
   - `CLOUDINARY_*`: Cloudinary credentials

4. **Run database migrations**
   ```bash
   bun run db:migrate
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

## Development

- **Build**: `bun run build`
- **Test**: `bun test`
- **Lint**: `bun run lint`
- **Format**: `bun run format`

## Deployment

The API is deployed on Fly.io. To deploy:

1. Install Fly CLI
2. Set up secrets:
   ```bash
   fly secrets set DATABASE_URL="your-database-url"
   # Set other secrets similarly
   ```
3. Deploy:
   ```bash
   fly deploy
   ```

## API Documentation

Swagger documentation is available at:
- Development: `http://localhost:3000/swagger`
- Production: `https://api-icy-sea-7991.fly.dev/swagger` 