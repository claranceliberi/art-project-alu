import { Hono } from 'hono';
import { z } from 'zod';
import { db, schema } from '../db';
import { eq, and } from 'drizzle-orm';

const router = new Hono();

// Validation schemas
const checkoutSchema = z.object({
  items: z.array(z.object({
    artwork: z.object({
      id: z.string().uuid(),
      price: z.number(),
      title: z.string(),
      artistName: z.string(),
      imageUrl: z.string(),
    }),
    quantity: z.number().min(1),
  })),
  shippingAddress: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    address: z.string().min(5),
    city: z.string().min(2),
    country: z.string().min(2),
    postalCode: z.string().min(2),
  }),
});

// Routes
router.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = checkoutSchema.parse(body);

    // Start a transaction
    const result = await db.transaction(async (tx) => {
      const transactionIds: string[] = [];

      // Process each item in the order
      for (const item of validatedData.items) {
        // Check if artwork exists and is not already sold
        const artwork = await tx.query.artworks.findFirst({
          where: eq(schema.artworks.id, item.artwork.id),
        });

        if (!artwork) {
          throw new Error(`Artwork ${item.artwork.id} not found`);
        }

        // Check if there's any completed transaction for this artwork
        const existingTransaction = await tx.query.transactions.findFirst({
          where: and(
            eq(schema.transactions.artworkId, item.artwork.id),
            eq(schema.transactions.status, 'completed')
          ),
        });

        if (existingTransaction) {
          throw new Error(`Artwork ${item.artwork.title} is already sold`);
        }

        // Create transaction for this item
        const newTransaction = await tx.insert(schema.transactions).values({
          amount: item.artwork.price.toString(),
          buyerId: null, // Temporarily set to null until auth is implemented
          artworkId: item.artwork.id,
          status: 'completed',
          shippingAddress: JSON.stringify(validatedData.shippingAddress),
          transactionDate: new Date(),
        }).returning();

        transactionIds.push(newTransaction[0].id);

        // Mark artwork as sold
        await tx.update(schema.artworks)
          .set({ isSold: true })
          .where(eq(schema.artworks.id, item.artwork.id));
      }

      return transactionIds;
    });

    return c.json({
      status: 'success',
      message: 'Order placed successfully',
      transactionIds: result,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: 'Failed to process checkout' }, 500);
  }
});

export { router as checkoutRoutes }; 