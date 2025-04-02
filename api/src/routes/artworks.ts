import { Hono } from 'hono';
import { z } from 'zod';
import { db, schema } from '../db';
import { eq, and, asc, desc, sql, inArray } from 'drizzle-orm';
import { uploadImage, deleteImage } from '../utils/upload';

const router = new Hono();

// Validation schemas
const createArtworkSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  categoryId: z.string().uuid(),
  artistId: z.string().uuid(),
  image: z.instanceof(File),
});

const updateArtworkSchema = createArtworkSchema.partial().omit({ image: true }).extend({
  image: z.instanceof(File).optional(),
});

// Routes
router.get('/', async (c) => {
  try {
    const query = c.req.query();
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '12');
    const offset = (page - 1) * limit;
    const categoryId = query.categoryId;
    const categoryIds = query.categoryIds ? query.categoryIds.split(',') : undefined;
    const minPrice = query.minPrice ? parseFloat(query.minPrice) : undefined;
    const maxPrice = query.maxPrice ? parseFloat(query.maxPrice) : undefined;
    const sort = query.sort || 'createdAt:desc';
    const available = query.available === 'true';

    // Build where conditions
    const whereConditions = [];
    if (categoryId) {
      whereConditions.push(eq(schema.artworks.categoryId, categoryId));
    } else if (categoryIds && categoryIds.length > 0) {
      whereConditions.push(inArray(schema.artworks.categoryId, categoryIds));
    }
    if (minPrice !== undefined) {
      whereConditions.push(sql`${schema.artworks.price} >= ${minPrice}`);
    }
    if (maxPrice !== undefined) {
      whereConditions.push(sql`${schema.artworks.price} <= ${maxPrice}`);
    }
    if (available) {
      whereConditions.push(eq(schema.artworks.isSold, false));
    }

    // Build order by
    let orderBy;
    if (sort === 'price:asc') {
      orderBy = asc(schema.artworks.price);
    } else if (sort === 'price:desc') {
      orderBy = desc(schema.artworks.price);
    } else {
      orderBy = desc(schema.artworks.createdAt);
    }

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(schema.artworks)
      .where(and(...whereConditions));

    // Get paginated artworks
    const artworks = await db.query.artworks.findMany({
      where: and(...whereConditions),
      orderBy,
      limit,
      offset,
      with: {
        artist: true,
        category: true,
      },
    });

    return c.json({
      artworks,
      total: Number(count),
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return c.json({ error: 'Failed to fetch artworks' }, 500);
  }
});

router.get('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const artwork = await db.query.artworks.findFirst({
      where: eq(schema.artworks.id, id),
      with: {
        artist: true,
        category: true,
      },
    });
    
    if (!artwork) {
      console.log('Artwork not found:', id);
      return c.json({ error: 'Artwork not found' }, 404);
    }
    return c.json(artwork);
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return c.json({ error: 'Failed to fetch artwork' }, 500);
  }
});

router.post('/', async (c) => {
  try {
    const formData = await c.req.formData();
    console.log('Received form data:', Object.fromEntries(formData.entries()));
    
    const image = formData.get('image') as File;
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      categoryId: formData.get('categoryId'),
      artistId: formData.get('artistId'),
      image,
    };

    console.log('Parsed data:', data);
    const validatedData = createArtworkSchema.parse(data);
    console.log('Validated data:', validatedData);
    
    // Check if category exists
    const category = await db.query.categories.findFirst({
      where: eq(schema.categories.id, validatedData.categoryId),
    });
    
    if (!category) {
      console.log('Category not found:', validatedData.categoryId);
      return c.json({ error: 'Category not found' }, 404);
    }
    
    // Check if artist exists
    const artist = await db.query.users.findFirst({
      where: eq(schema.users.id, validatedData.artistId),
    });
    
    if (!artist) {
      console.log('Artist not found:', validatedData.artistId);
      return c.json({ error: 'Artist not found' }, 404);
    }
    
    // Upload image to Cloudinary
    console.log('Uploading image...');
    const imageUrl = await uploadImage(validatedData.image, 'artworks');
    console.log('Image uploaded:', imageUrl);
    
    // Create artwork in database
    console.log('Creating artwork in database...');
    const newArtwork = await db.insert(schema.artworks).values({
      ...validatedData,
      price: validatedData.price.toString(),
      imageUrl,
    }).returning();
    
    console.log('Created artwork:', newArtwork[0]);
    return c.json(newArtwork[0], 201);
  } catch (error) {
    console.error('Error creating artwork:', error);
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Failed to create artwork' }, 500);
  }
});

router.put('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const formData = await c.req.formData();
    console.log('Received form data:', Object.fromEntries(formData.entries()));
    
    const image = formData.get('image') as File | null;
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price') ? Number(formData.get('price')) : undefined,
      categoryId: formData.get('categoryId'),
      artistId: formData.get('artistId'),
      ...(image && { image }),
    };

    console.log('Parsed data:', data);
    const validatedData = updateArtworkSchema.parse(data);
    console.log('Validated data:', validatedData);
    
    // Get existing artwork
    const existingArtwork = await db.query.artworks.findFirst({
      where: eq(schema.artworks.id, id),
    });

    if (!existingArtwork) {
      console.log('Artwork not found:', id);
      return c.json({ error: 'Artwork not found' }, 404);
    }

    // Handle image update if provided
    let imageUrl = existingArtwork.imageUrl;
    if (image) {
      console.log('Updating image...');
      // Delete old image
      await deleteImage(existingArtwork.imageUrl);
      // Upload new image
      imageUrl = await uploadImage(image, 'artworks');
      console.log('New image uploaded:', imageUrl);
    }

    // Update artwork in database
    console.log('Updating artwork in database...');
    const updatedArtwork = await db
      .update(schema.artworks)
      .set({
        ...validatedData,
        price: validatedData.price?.toString(),
        imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(schema.artworks.id, id))
      .returning();

    console.log('Updated artwork:', updatedArtwork[0]);
    return c.json(updatedArtwork[0]);
  } catch (error) {
    console.error('Error updating artwork:', error);
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Failed to update artwork' }, 500);
  }
});

router.delete('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    // Get artwork to delete its image
    const artwork = await db.query.artworks.findFirst({
      where: eq(schema.artworks.id, id),
    });

    if (!artwork) {
      console.log('Artwork not found:', id);
      return c.json({ error: 'Artwork not found' }, 404);
    }

    // Delete image from Cloudinary
    console.log('Deleting image:', artwork.imageUrl);
    await deleteImage(artwork.imageUrl);

    // Delete artwork from database
    console.log('Deleting artwork from database...');
    await db.delete(schema.artworks).where(eq(schema.artworks.id, id));

    console.log('Artwork deleted successfully');
    return c.json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    console.error('Error deleting artwork:', error);
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Failed to delete artwork' }, 500);
  }
});

export { router as artworkRoutes }; 