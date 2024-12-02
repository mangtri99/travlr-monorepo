import { z } from 'zod';

export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3).max(255),
  price: z.number().positive(),
  description: z.string().min(0).optional(),
  // transform to number
  stock: z.number().min(0).optional(),
  status: z.enum(['available', 'pending', 'sold']).optional(),
});

export type FormProductType = z.infer<typeof productSchema>;
