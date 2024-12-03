import { REDIS_PRODUCTS_KEY, REDIS_SERVICE_INIT } from '../config/redis';
import { PRODUCT_STATUS } from '../config/status';

const redis = REDIS_SERVICE_INIT;
const productSeeder = async (count = 10, isReset = false) => {
  const getProductStatusRandom = () => {
    const status = Object.values(PRODUCT_STATUS);
    return status[Math.floor(Math.random() * status.length)];
  };
  // generate products
  const products = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000),
    description: `This is product ${i + 1}`,
    stock: Math.floor(Math.random() * 100),
    status: getProductStatusRandom(),
    createdAt: new Date(),
    updatedAt: new Date(),
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
