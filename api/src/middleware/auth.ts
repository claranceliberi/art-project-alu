import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: string;
}

declare module 'hono' {
  interface ContextVariableMap {
    'user': JwtPayload;
  }
}

export const authenticateToken = async (c: Context, next: Next) => {
  const authHeader = c.req.header('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return c.json({ error: 'Authentication required' }, 401);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as JwtPayload;
    c.set('user', decoded);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 403);
  }
};

export const requireArtist = async (c: Context, next: Next) => {
  const user = c.get('user');
  if (!user || user.role !== 'artist') {
    return c.json({ error: 'Artist access required' }, 403);
  }
  await next();
}; 