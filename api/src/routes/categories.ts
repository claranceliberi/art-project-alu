import { Hono } from 'hono';
import { z } from 'zod';
import { db, schema } from '../db';
import { eq, ilike } from 'drizzle-orm';

const router = new Hono();

// Validation schemas
const createCategorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});

// Routes
router.get('/', async (c) => {
  try {
    const name = c.req.query('name');
    if (name) {
      const category = await db.query.categories.findFirst({
        where: ilike(schema.categories.name, name),
        with: {
          artworks: true,
        },
      });
      return c.json(category);
    }

    const categories = await db.query.categories.findMany({
      with: {
        artworks: true,
      },
    });
    return c.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return c.json({ error: 'Failed to fetch categories' }, 500);
  }
});

router.get('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const category = await db.query.categories.findFirst({
      where: eq(schema.categories.id, id),
      with: {
        artworks: true,
      },
    });
    
    if (!category) {
      return c.json({ error: 'Category not found' }, 404);
    }
    return c.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return c.json({ error: 'Failed to fetch category' }, 500);
  }
});

router.post('/', async (c) => {
  try {
    const body = await c.req.json();
    console.log('Creating category with data:', body);
    
    const validatedData = createCategorySchema.parse(body);
    console.log('Validated data:', validatedData);

    // Check if category already exists
    const existingCategory = await db.query.categories.findFirst({
      where: ilike(schema.categories.name, validatedData.name),
    });

    if (existingCategory) {
      console.log('Category already exists:', existingCategory);
      return c.json(existingCategory);
    }
    
    const newCategory = await db.insert(schema.categories).values(validatedData).returning();
    console.log('Created category:', newCategory[0]);
    
    return c.json(newCategory[0], 201);
  } catch (error) {
    console.error('Error creating category:', error);
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Failed to create category' }, 500);
  }
});

router.put('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const body = await c.req.json();
    const validatedData = createCategorySchema.partial().parse(body);
    
    const updatedCategory = await db
      .update(schema.categories)
      .set({ ...validatedData, updatedAt: new Date() })
      .where(eq(schema.categories.id, id))
      .returning();

    if (!updatedCategory.length) {
      return c.json({ error: 'Category not found' }, 404);
    }
    
    return c.json(updatedCategory[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    return c.json({ error: 'Failed to update category' }, 500);
  }
});

router.delete('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    // Check if category has artworks
    const category = await db.query.categories.findFirst({
      where: eq(schema.categories.id, id),
      with: {
        artworks: true,
      },
    });

    if (!category) {
      return c.json({ error: 'Category not found' }, 404);
    }

    if (category.artworks.length > 0) {
      return c.json({ error: 'Cannot delete category with existing artworks' }, 400);
    }

    await db.delete(schema.categories).where(eq(schema.categories.id, id));
    
    return c.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete category' }, 500);
  }
});

export { router as categoryRoutes }; 