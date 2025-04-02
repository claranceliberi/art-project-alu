import { Hono } from 'hono';
import { z } from 'zod';
import { db, schema } from '../db';
import { eq, ilike } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const router = new Hono();

// Validation schemas
const createArtistSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().default('artist'),
  bio: z.string().optional(),
  profileImage: z.string().optional(),
  isVerified: z.boolean().optional(),
});

// Routes
router.get('/', async (c) => {
  try {
    const artists = await db.query.users.findMany({
      where: eq(schema.users.role, 'artist'),
      with: {
        artworks: true,
      },
    });
    return c.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return c.json({ error: 'Failed to fetch artists' }, 500);
  }
});

router.get('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const artist = await db.query.users.findFirst({
      where: eq(schema.users.id, id),
      with: {
        artworks: true,
      },
    });
    
    if (!artist) {
      return c.json({ error: 'Artist not found' }, 404);
    }
    return c.json(artist);
  } catch (error) {
    console.error('Error fetching artist:', error);
    return c.json({ error: 'Failed to fetch artist' }, 500);
  }
});

router.post('/', async (c) => {
  try {
    const body = await c.req.json();
    console.log('Creating artist with data:', body);
    
    const validatedData = createArtistSchema.parse(body);
    console.log('Validated data:', validatedData);

    // Check if artist already exists
    const existingArtist = await db.query.users.findFirst({
      where: eq(schema.users.email, validatedData.email),
    });

    if (existingArtist) {
      console.log('Artist already exists:', existingArtist);
      return c.json(existingArtist);
    }
    
    // Hash a default password for the artist
    const hashedPassword = await bcrypt.hash('artist123', 10);
    
    const newArtist = await db.insert(schema.users).values({
      ...validatedData,
      password: hashedPassword,
      profileImageURL: validatedData.profileImage,
    }).returning();

    console.log('Created artist:', newArtist[0]);
    return c.json(newArtist[0], 201);
  } catch (error) {
    console.error('Error creating artist:', error);
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Failed to create artist' }, 500);
  }
});

export { router as artistRoutes }; 