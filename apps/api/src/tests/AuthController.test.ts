import request from 'supertest';
import { app } from '../app';
import Redis from 'ioredis-mock';
import { REDIS_USER_KEY } from '../config/redis';
import bcryptjs from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { AUTH_SERVICE_PATH, BASE_API_URL_AUTH } from '../config/url';

jest.mock('ioredis', () => require('ioredis-mock'));

const redis = new Redis();
const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: bcryptjs.hashSync('password123', 10),
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(async () => {
  await redis.set(REDIS_USER_KEY, JSON.stringify([mockUser]));
});

afterEach(async () => {
  await redis.del(REDIS_USER_KEY);
});

describe('Auth Controller', () => {
  describe('API User Register', () => {
    it('should register a new user', async () => {
      const newUser = {
        name: 'New User',
        email: 'new@example.com',
        password: 'newpassword',
        confirmPassword: 'newpassword',
      };
      const response = await request(app)
        .post(`${BASE_API_URL_AUTH}${AUTH_SERVICE_PATH.register}`)
        .send(newUser);
      expect(response.status).toBe(201);
      expect(response.body.data.email).toBe(newUser.email);
    });

    it('should return 400 if the user already exists', async () => {
      const response = await request(app)
        .post(`${BASE_API_URL_AUTH}${AUTH_SERVICE_PATH.register}`)
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User already exists');
    });
  });

  describe('API User Login', () => {
    it('should log in an existing user with correct credentials', async () => {
      const response = await request(app)
        .post(`${BASE_API_URL_AUTH}${AUTH_SERVICE_PATH.login}`)
        .send({ email: 'test@example.com', password: 'password123' });
      expect(response.status).toBe(200);
      expect(response.body.data.user.email).toBe('test@example.com');
      expect(response.body.data.token).toBeDefined();
    });

    it('should return 404 for incorrect credentials', async () => {
      const response = await request(app)
        .post(`${BASE_API_URL_AUTH}${AUTH_SERVICE_PATH.login}`)
        .send({ email: 'test@example.com', password: 'wrongpassword' });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Email or password is incorrect');
    });
  });

  describe('API Loggedin User', () => {
    it('should return the currently logged-in user', async () => {
      const token = generateToken({
        email: 'test@example.com',
        name: 'Test User',
      });
      const response = await request(app)
        .get(`${BASE_API_URL_AUTH}${AUTH_SERVICE_PATH.user}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.data.email).toBe('test@example.com');
    });

    it('should return 401 if no token is provided', async () => {
      const response = await request(app).get(
        `${BASE_API_URL_AUTH}${AUTH_SERVICE_PATH.user}`
      );
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });
  });

  describe('API User List', () => {
    it('should list all users', async () => {
      const response = await request(app).get(
        `${BASE_API_URL_AUTH}${AUTH_SERVICE_PATH.userList}`
      );
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
    });

    it('should return an empty list if no users exist', async () => {
      await redis.del(REDIS_USER_KEY);
      const response = await request(app).get(
        `${BASE_API_URL_AUTH}${AUTH_SERVICE_PATH.userList}`
      );
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('API Logout', () => {
    it('should log out the currently logged-in user', async () => {
      const token = generateToken({
        email: 'test@example.com',
        name: 'Test User',
      });
      const response = await request(app)
        .post(`${BASE_API_URL_AUTH}/logout`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Logged out successfully');
    });
  });
});
