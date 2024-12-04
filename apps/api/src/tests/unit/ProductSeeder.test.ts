import Redis from 'ioredis-mock';
import { REDIS_PRODUCTS_KEY } from '../../config/redis';
import productSeeder from '../../seeder/product';

// Mock the Redis initialization
jest.mock('../../config/redis', () => ({
  REDIS_PRODUCTS_KEY: 'products',
  REDIS_SERVICE_INIT: new Redis(),
}));

describe('productSeeder with ioredis-mock', () => {
  const redis = require('../../config/redis').REDIS_SERVICE_INIT;

  beforeEach(async () => {
    await redis.flushall(); // Clear the mock Redis database before each test
  });

  it('should seed new products when isReset is true', async () => {
    const count = 5;
    const isReset = true;

    const result = await productSeeder(count, isReset);

    expect(result).toBe(true);

    const cachedProducts = JSON.parse(await redis.get(REDIS_PRODUCTS_KEY));
    expect(cachedProducts).toHaveLength(count); // Ensure correct number of products seeded
    expect(cachedProducts[0]).toHaveProperty('id', 1); // Verify product structure
  });

  it('should seed products if no cached products exist', async () => {
    const count = 5;
    const isReset = false;

    const result = await productSeeder(count, isReset);

    expect(result).toBe(true);

    const cachedProducts = JSON.parse(await redis.get(REDIS_PRODUCTS_KEY));
    expect(cachedProducts).toHaveLength(count);
    expect(cachedProducts[0]).toHaveProperty('id', 1);
  });

  it('should append new products if cached products exist', async () => {
    const initialProducts = [{ id: 1, name: 'Existing Product' }];
    await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify(initialProducts));

    const count = 3;
    const isReset = false;

    const result = await productSeeder(count, isReset);

    expect(result).toBe(true);

    const cachedProducts = JSON.parse(await redis.get(REDIS_PRODUCTS_KEY));
    expect(cachedProducts).toHaveLength(initialProducts.length + count);
    expect(cachedProducts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: 'Existing Product' }),
      ])
    );
  });

  it('should generate random product statuses from PRODUCT_STATUS', async () => {
    const count = 1;
    const isReset = true;

    await productSeeder(count, isReset);

    const cachedProducts = JSON.parse(await redis.get(REDIS_PRODUCTS_KEY));
    const statuses = Object.values(
      require('../../config/status').PRODUCT_STATUS
    );

    expect(statuses).toContain(cachedProducts[0].status);
  });
});
