import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { swaggerUI } from '@hono/swagger-ui';
import { swaggerConfig } from './swagger';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes (we'll create these next)
import { userRoutes } from './routes/users';
import { artworkRoutes } from './routes/artworks';
import { categoryRoutes } from './routes/categories';
import { transactionRoutes } from './routes/transactions';
import { artistRoutes } from './routes/artists';
import { checkoutRoutes } from './routes/checkout';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', prettyJSON());
app.use('*', cors());

// Swagger documentation
app.get('/swagger', swaggerUI({ url: '/api-docs' }));
app.get('/api-docs', (c) => c.json(swaggerConfig));

// Health check route
app.get('/', (c) => c.json({ status: 'ok', message: 'Art Marketplace API' }));

// Routes
app.route('/api/users', userRoutes);
app.route('/api/artworks', artworkRoutes);
app.route('/api/categories', categoryRoutes);
app.route('/api/transactions', transactionRoutes);
app.route('/api/artists', artistRoutes);
app.route('/api/checkout', checkoutRoutes);

// Error handling
app.onError((err: any, c) => {
  console.error(`${err}`);
  return c.json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  }, err.status || 500);
});

// Start the server
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);
console.log(`Swagger documentation available at http://localhost:${port}/swagger`);

serve({
  fetch: app.fetch,
  port: Number(port),
  hostname: '0.0.0.0'
}); 