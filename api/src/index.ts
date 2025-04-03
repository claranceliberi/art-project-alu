import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { serve } from '@hono/node-server';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './db/schema';
import { artworks } from './db/schema';
import { artworkRoutes } from './routes/artworks';
import { authRoutes } from './routes/auth';
import checkoutRoutes from './routes/checkout';
import { transactionRoutes } from './routes/transactions';
import { categoryRoutes } from './routes/categories';
import { artistRoutes } from './routes/artists';
import { userRoutes } from './routes/users';

// Load environment variables
config();

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());
app.use('*', prettyJSON());

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client, { schema });

// Routes
app.route('/api/artworks', artworkRoutes);
app.route('/api/auth', authRoutes);
app.route('/api/checkout', checkoutRoutes);
app.route('/api/transactions', transactionRoutes);
app.route('/api/categories', categoryRoutes);
app.route('/api/artists', artistRoutes);
app.route('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (c) => c.json({ status: 'ok' }));

// Run migrations
const runMigrations = async () => {
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
};

// Start server
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: Number(port),
});

export default {
  port,
  runMigrations,
}; 