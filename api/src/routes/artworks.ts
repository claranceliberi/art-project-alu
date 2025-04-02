import { Hono } from 'hono';
import { z } from 'zod';
import { db } from '../db';
import { artworks } from '../db/schema';
import { eq, and, gte, lte, sql } from 'drizzle-orm';
import { authenticateToken, requireArtist } from '../middleware/auth';

type Env = {
  user: {
    userId: string;
    role: string;
  };
};

const router = new Hono<{ Bindings: Env }>();

const createArtworkSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  imageUrl: z.string().url(),
  categoryId: z.string().uuid(),
  quantity: z.number().int().positive().default(1),
});

// Create artwork (artist only)
router.post('/', authenticateToken, requireArtist, async (c) => {
  try {
    const artworkData = createArtworkSchema.parse(await c.req.json());
    const user = c.get('user');

    const [artwork] = await db
      .insert(artworks)
      .values({
        ...artworkData,
        price: artworkData.price.toString(),
        quantity: artworkData.quantity.toString(),
        artistId: user.userId,
      })
      .returning();

    return c.json(artwork, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get all artworks with filters (public endpoint)
router.get('/', async (c) => {
  try {
    const page = Number(c.req.query('page')) || 1;
    const limit = Number(c.req.query('limit')) || 12;
    const categoryId = c.req.query('categoryId');
    const minPrice = Number(c.req.query('minPrice')) || 0;
    const maxPrice = c.req.query('maxPrice') ? Number(c.req.query('maxPrice')) : undefined;
    const sort = c.req.query('sort') || 'createdAt:desc';

    const offset = (page - 1) * limit;
    const whereClause = [];

    if (categoryId) {
      whereClause.push(eq(artworks.categoryId, categoryId));
    }

    if (minPrice !== undefined) {
      whereClause.push(gte(artworks.price, minPrice.toString()));
    }

    if (maxPrice !== undefined) {
      whereClause.push(lte(artworks.price, maxPrice.toString()));
    }

    const [sortField, sortOrder] = sort.split(':');
    const orderByClause = sql`${artworks[sortField as keyof typeof artworks]} ${sql.raw(sortOrder === 'desc' ? 'DESC' : 'ASC')}`;

    const results = await db.query.artworks.findMany({
      where: whereClause.length > 0 ? and(...whereClause) : undefined,
      limit,
      offset,
      orderBy: orderByClause,
      with: {
        category: true,
        artist: true,
      },
    });

    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(artworks)
      .where(whereClause.length > 0 ? and(...whereClause) : undefined);

    const total = Number(totalCount[0]?.count || 0);

    return c.json({
      artworks: results,
      total,
      page,
      limit,
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch artworks' }, 500);
  }
});

// Get artist's artworks (requires authentication)
router.get('/my-artworks', authenticateToken, requireArtist, async (c) => {
  try {
    const user = c.get('user');
    const artistArtworks = await db.query.artworks.findMany({
      where: eq(artworks.artistId, user.userId),
      with: {
        category: true,
      },
    });
    return c.json({
      artworks: artistArtworks,
      total: artistArtworks.length,
      page: 1,
      limit: artistArtworks.length,
    });
  } catch (error) {
    console.error('Error fetching artist artworks:', error);
    return c.json({ error: 'Failed to fetch artworks' }, 500);
  }
});

// Update artwork (artist only)
router.patch('/:id', authenticateToken, requireArtist, async (c) => {
  try {
    const id = c.req.param('id');
    const artworkData = createArtworkSchema.partial().parse(await c.req.json());
    const user = c.get('user');

    const [artwork] = await db
      .update(artworks)
      .set({
        ...artworkData,
        price: artworkData.price?.toString(),
        quantity: artworkData.quantity?.toString(),
        updatedAt: new Date(),
      })
      .where(eq(artworks.id, id))
      .returning();

    if (!artwork) {
      return c.json({ error: 'Artwork not found' }, 404);
    }

    if (artwork.artistId !== user.userId) {
      return c.json({ error: 'Not authorized to update this artwork' }, 403);
    }

    return c.json(artwork);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete artwork (artist only)
router.delete('/:id', authenticateToken, requireArtist, async (c) => {
  try {
    const id = c.req.param('id');
    const user = c.get('user');

    const [artwork] = await db
      .delete(artworks)
      .where(eq(artworks.id, id))
      .returning();

    if (!artwork) {
      return c.json({ error: 'Artwork not found' }, 404);
    }

    if (artwork.artistId !== user.userId) {
      return c.json({ error: 'Not authorized to delete this artwork' }, 403);
    }

    return c.json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export { router as artworkRoutes }; 