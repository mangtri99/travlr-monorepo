import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(3).max(255),
  price: z.number().positive(),
  description: z.string().min(0).optional(),
  stock: z.number().min(0).optional(),
  status: z.enum(['available', 'pending', 'sold']).optional(),
});
