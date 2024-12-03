import Redis from 'ioredis';

export const REDIS_SERVICE_INIT = new Redis(process.env.REDIS_URL);
export const REDIS_PRODUCTS_KEY = 'products';
export const REDIS_USER_KEY = 'users';
