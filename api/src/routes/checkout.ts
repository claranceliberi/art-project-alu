import { Hono } from 'hono';
import { z } from 'zod';
import { db, schema } from '../db';
import { eq, and } from 'drizzle-orm';
import { authenticateToken } from '../middleware/auth';

const router = new Hono();

// Validation schema for checkout request
const checkoutSchema = z.object({
  items: z.array(z.object({
    artworkId: z.string().uuid(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  })),
  buyerId: z.string().uuid(),
  shippingAddress: z.object({
    fullName: z.string().min(1),
    streetAddress: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipCode: z.string().min(1),
    country: z.string().min(1)
  })
});

router.post('/', authenticateToken, async (c) => {
  try {
    const body = await c.req.json();
    console.log('Checkout request body:', body);
    
    const validatedData = checkoutSchema.parse(body);
    console.log('Validated checkout data:', validatedData);
    
    const user = c.get('user');
    console.log('Authenticated user:', user);

    // Verify the buyer ID matches the authenticated user
    if (validatedData.buyerId !== user.userId) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    // Process each item in the cart
    const transactions = [];
    for (const item of validatedData.items) {
      console.log('Processing item:', item);
      
      // Check if artwork exists and is not already sold
      const artwork = await db.query.artworks.findFirst({
        where: eq(schema.artworks.id, item.artworkId),
      });

      if (!artwork) {
        return c.json({ error: `Artwork ${item.artworkId} not found` }, 404);
      }

      console.log('Found artwork:', artwork);

      // Check if there's any completed transaction for this artwork
      const existingTransaction = await db.query.transactions.findFirst({
        where: and(
          eq(schema.transactions.artworkId, item.artworkId),
          eq(schema.transactions.status, 'completed')
        ),
      });

      if (existingTransaction) {
        return c.json({ error: `Artwork ${item.artworkId} is already sold` }, 400);
      }

      // Create transaction for each item
      const [transaction] = await db.insert(schema.transactions).values({
        amount: (item.price * item.quantity).toString(),
        buyerId: validatedData.buyerId,
        artworkId: item.artworkId,
        status: 'pending',
        shippingAddress: validatedData.shippingAddress
      }).returning();

      console.log('Created transaction:', transaction);
      transactions.push(transaction);
    }

    return c.json({
      message: 'Checkout processed successfully',
      transactions
    });
  } catch (error) {
    console.error('Checkout error:', error);
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }
    return c.json({ error: `Failed to process checkout: ${error.message}` }, 500);
  }
});

export { router as checkoutRoutes }; 