import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize postgres connection with SSL and additional options
const client = postgres(process.env.DATABASE_URL!, {
  ssl: {
    rejectUnauthorized: false
  },
  max: 1,
  connection: {
    application_name: "art-marketplace-api"
  }
});

// Initialize drizzle with the client and schema
export const db = drizzle(client, { schema });

// Export schema for use in other files
export { schema }; 