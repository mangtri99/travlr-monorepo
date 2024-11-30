import { Request, Response } from 'express';
import productSeeder from '../seeder/product';
import userSeeder from '../seeder/user';

const productSeed = async (req: Request, res: Response) => {
  const { count, isReset } = req.query;

  await productSeeder(Number(count), Boolean(isReset));

  return res.json({ message: 'Product seeded' });
};

const userSeed = async (req: Request, res: Response) => {
  const { count } = req.query;

  await userSeeder(Number(count));

  return res.json({ message: 'User seeded' });
};

export default {
  productSeed,
  userSeed,
};
