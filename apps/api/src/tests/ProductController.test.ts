import request from 'supertest';
// import { app } from '../app';
import { REDIS_PRODUCTS_KEY } from '../config/redis';
import Redis from 'ioredis-mock';
import { BASE_API_URL_PRODUCTS } from '../config/url';
import { generateToken } from '../utils/jwt';

const app = require('../app');

jest.mock('ioredis', () => require('ioredis-mock'));

const redis = new Redis();
const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 100,
  description: 'A test product',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const token = generateToken({
  email: 'test@example.com',
  name: 'Test User',
});

beforeEach(async () => {
  await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify([mockProduct]));
});

afterEach(async () => {
  await redis.del(REDIS_PRODUCTS_KEY);
});

describe('Product Controller', () => {
  describe('API Get All Products', () => {
    it('should return a paginated list of products', async () => {
      const response = await request(app)
        .get(`${BASE_API_URL_PRODUCTS}`)
        .set('Authorization', `Bearer ${token}`)
        .query({ page: 1, perPage: 10 });
      expect(response.status).toBe(200);
      expect(response.body.data.products).toHaveLength(1);
    });

    it('should filter products by search query', async () => {
      const response = await request(app)
        .get(`${BASE_API_URL_PRODUCTS}`)
        .set('Authorization', `Bearer ${token}`)
        .query({ search: 'Test' });
      expect(response.status).toBe(200);
      expect(response.body.data.products[0].name).toContain('Test Product');
    });
  });

  describe('API Single Product', () => {
    it('should return a single product by id', async () => {
      const response = await request(app)
        .get(`${BASE_API_URL_PRODUCTS}/1`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('Test Product');
    });

    it('should return 404 if product is not found', async () => {
      const response = await request(app)
        .get(`${BASE_API_URL_PRODUCTS}/999`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Product not found');
    });
  });

  describe('API Create Product', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'New Product',
        price: 150,
        description: 'A new product',
      };
      const response = await request(app)
        .post(`${BASE_API_URL_PRODUCTS}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newProduct);
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(newProduct.name);
    });
  });

  describe('API Edit Product', () => {
    it('should update an existing product', async () => {
      const updatedProduct = {
        name: 'Updated Product',
        price: 200,
        description: 'An updated product',
      };
      const response = await request(app)
        .put(`${BASE_API_URL_PRODUCTS}/1`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedProduct);
      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('Updated Product');
    });

    it('should return 404 if product to update is not found', async () => {
      const response = await request(app)
        .put(`${BASE_API_URL_PRODUCTS}/999`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Nonexistent Product',
          price: 100,
          description: 'Not available',
        });
      expect(response.status).toBe(404);
    });
  });

  describe('API Delete Product', () => {
    it('should delete a product by id', async () => {
      const response = await request(app)
        .delete(`${BASE_API_URL_PRODUCTS}/1`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(204);
    });

    it('should return 404 if product to delete is not found', async () => {
      const response = await request(app)
        .delete(`${BASE_API_URL_PRODUCTS}/999`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
    });
  });
});
