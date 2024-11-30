import Redis from 'ioredis';
import { REDIS_PRODUCTS_KEY } from '../config/redis';

const redis = new Redis();
const productSeeder = async (count = 10, isReset = false) => {
  // generate products
  const products = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000),
    description: `This is product ${i + 1}`,
  }));

  if (isReset) {
    await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify(products));
  } else {
    const cachedProducts = await redis.get(REDIS_PRODUCTS_KEY);
    if (!cachedProducts) {
      await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify(products));
    } else {
      const parsedProducts = JSON.parse(cachedProducts);
      const newProducts = [...parsedProducts, ...products];
      await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify(newProducts));
    }
  }

  return true;
};

export default productSeeder;
