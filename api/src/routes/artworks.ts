import { Hono } from 'hono';
import { z } from 'zod';
import { db, schema } from '../db';
import { eq } from 'drizzle-orm';
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
    const artworks = await db.query.artworks.findMany({
      with: {
        artist: true,
        category: true,
      },
    });
    return c.json(artworks);
  } catch (error) {
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
      return c.json({ error: 'Artwork not found' }, 404);
    }
    return c.json(artwork);
  } catch (error) {
    return c.json({ error: 'Failed to fetch artwork' }, 500);
  }
});

router.post('/', async (c) => {
  try {
    const formData = await c.req.formData();
    const image = formData.get('image') as File;
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      categoryId: formData.get('categoryId'),
      artistId: formData.get('artistId'),
      image,
    };

    const validatedData = createArtworkSchema.parse(data);
    
    // Upload image to Cloudinary
    const imageUrl = await uploadImage(validatedData.image, 'artworks');
    
    // Create artwork in database
    const newArtwork = await db.insert(schema.artworks).values({
      ...validatedData,
      imageUrl,
    }).returning();

    return c.json(newArtwork[0], 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    return c.json({ error: 'Failed to create artwork' }, 500);
  }
});

router.put('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const formData = await c.req.formData();
    const image = formData.get('image') as File | null;
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price') ? Number(formData.get('price')) : undefined,
      categoryId: formData.get('categoryId'),
      artistId: formData.get('artistId'),
      ...(image && { image }),
    };

    const validatedData = updateArtworkSchema.parse(data);
    
    // Get existing artwork
    const existingArtwork = await db.query.artworks.findFirst({
      where: eq(schema.artworks.id, id),
    });

    if (!existingArtwork) {
      return c.json({ error: 'Artwork not found' }, 404);
    }

    // Handle image update if provided
    let imageUrl = existingArtwork.imageUrl;
    if (image) {
      // Delete old image
      await deleteImage(existingArtwork.imageUrl);
      // Upload new image
      imageUrl = await uploadImage(image, 'artworks');
    }

    // Update artwork in database
    const updatedArtwork = await db
      .update(schema.artworks)
      .set({
        ...validatedData,
        imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(schema.artworks.id, id))
      .returning();

    return c.json(updatedArtwork[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
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
      return c.json({ error: 'Artwork not found' }, 404);
    }

    // Delete image from Cloudinary
    await deleteImage(artwork.imageUrl);

    // Delete artwork from database
    await db.delete(schema.artworks).where(eq(schema.artworks.id, id));

    return c.json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete artwork' }, 500);
  }
});

export { router as artworkRoutes }; 