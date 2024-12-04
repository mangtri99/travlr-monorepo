import { REDIS_PRODUCTS_KEY, REDIS_SERVICE_INIT } from '../config/redis';
import { PRODUCT_STATUS } from '../config/status';

const redis = REDIS_SERVICE_INIT; // equal to new Redis();
const productSeeder = async (count = 10, isReset = false) => {
  const cachedProducts = (await redis.get(REDIS_PRODUCTS_KEY)) || '[]';
  const getProducts = JSON.parse(cachedProducts);

  let latestProductId = 0;
  if (!isReset && getProducts.length > 0) {
    latestProductId = Number(getProducts[getProducts.length - 1].id);
  }

  const getProductStatusRandom = () => {
    const status = Object.values(PRODUCT_STATUS);
    return status[Math.floor(Math.random() * status.length)];
  };
  // generate products
  const products = Array.from({ length: count }, (_, i) => ({
    id: latestProductId + i + 1,
    name: `Product ${latestProductId + i + 1}`,
    price: Math.floor(Math.random() * 1000),
    description: `This is product ${latestProductId + i + 1}`,
    stock: Math.floor(Math.random() * 100),
    status: getProductStatusRandom(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  if (isReset) {
    await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify(products));
  } else {
    if (getProducts.length === 0) {
      await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify(products));
    } else {
      const newProducts = [...getProducts, ...products];
      await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify(newProducts));
    }
  }

  return true;
};

export default productSeeder;
