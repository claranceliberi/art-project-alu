import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { swaggerUI } from '@hono/swagger-ui';
import { swaggerConfig } from './swagger';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth';
import { artworkRoutes } from './routes/artworks';

// Load environment variables
dotenv.config();

// Import routes
import { userRoutes } from './routes/users';
import { categoryRoutes } from './routes/categories';
import { transactionRoutes } from './routes/transactions';
import { artistRoutes } from './routes/artists';
import { checkoutRoutes } from './routes/checkout';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: '*',
  allowMethods: ['*'],
  allowHeaders: ['*'],
  credentials: true,
  exposeHeaders: ['*'],
}));
app.use('*', prettyJSON());

// Swagger UI
app.get('/swagger', swaggerUI({ url: '/swagger.json' }));
app.get('/swagger.json', (c) => c.json(swaggerConfig));

// Health check
app.get('/', (c) => c.json({ status: 'ok' }));

// Routes
app.route('/api/auth', authRoutes);
app.route('/api/users', userRoutes);
app.route('/api/categories', categoryRoutes);
app.route('/api/transactions', transactionRoutes);
app.route('/api/artists', artistRoutes);
app.route('/api/checkout', checkoutRoutes);
app.route('/api/artworks', artworkRoutes);

// Start server
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);
console.log(`Swagger documentation available at http://localhost:${port}/swagger`);

serve({
  fetch: app.fetch,
  port: Number(port),
});

export default app; 