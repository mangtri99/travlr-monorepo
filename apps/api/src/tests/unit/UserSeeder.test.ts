import Redis from 'ioredis-mock';
import bcryptjs from 'bcryptjs';
import userSeeder from '../../seeder/user';
import { REDIS_USER_KEY } from '../../config/redis';

// Mock the Redis configuration
jest.mock('../../config/redis', () => ({
  REDIS_USER_KEY: 'mocked_users_key',
  REDIS_SERVICE_INIT: new Redis(),
}));

// Mock bcryptjs.hash
jest.mock('bcryptjs');

describe('userSeeder with ioredis-mock', () => {
  const redis = require('../../config/redis').REDIS_SERVICE_INIT;
  const mockedBcryptHash = bcryptjs.hash as jest.Mock;

  beforeEach(async () => {
    await redis.flushall(); // Clear mock Redis before each test
    mockedBcryptHash.mockClear(); // Clear bcryptjs mocks
    mockedBcryptHash.mockResolvedValue('hashed_password'); // Mock hash function
  });

  it('should seed new users when no cached users exist', async () => {
    const count = 2;

    const result = await userSeeder(count);

    expect(result).toBe(true);

    const cachedUsers = JSON.parse(await redis.get(REDIS_USER_KEY));
    expect(cachedUsers).toHaveLength(count);
    expect(cachedUsers[0]).toHaveProperty('id', 1);
    expect(cachedUsers[0]).toHaveProperty('name', 'User 1');
    expect(cachedUsers[0]).toHaveProperty('email', 'user1@gmail.com');
    expect(cachedUsers[0].password).toBe('hashed_password');
  });

  it('should append new users if cached users exist', async () => {
    const initialUsers = [
      {
        id: 1,
        name: 'Existing User',
        email: 'existing@gmail.com',
        password: 'hashed_password',
      },
    ];
    await redis.set(REDIS_USER_KEY, JSON.stringify(initialUsers));

    const count = 2;

    const result = await userSeeder(count);

    expect(result).toBe(true);

    const cachedUsers = JSON.parse(await redis.get(REDIS_USER_KEY));
    expect(cachedUsers).toHaveLength(initialUsers.length + count);
    expect(cachedUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: 'Existing User' }),
      ])
    );
    expect(cachedUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 2,
          name: 'User 2',
          email: 'user2@gmail.com',
        }),
      ])
    );
  });

  it('should hash passwords correctly using bcryptjs', async () => {
    const count = 1;

    await userSeeder(count);

    expect(mockedBcryptHash).toHaveBeenCalledTimes(count);
    expect(mockedBcryptHash).toHaveBeenCalledWith('password', 10);

    const cachedUsers = JSON.parse(await redis.get(REDIS_USER_KEY));
    expect(cachedUsers[0].password).toBe('hashed_password');
  });

  it('should handle seeding multiple users correctly', async () => {
    const count = 5;

    const result = await userSeeder(count);

    expect(result).toBe(true);

    const cachedUsers = JSON.parse(await redis.get(REDIS_USER_KEY));
    expect(cachedUsers).toHaveLength(count);
    cachedUsers.forEach((user, index) => {
      expect(user).toHaveProperty('id', index + 1);
      expect(user).toHaveProperty('name', `User ${index + 1}`);
      expect(user).toHaveProperty('email', `user${index + 1}@gmail.com`);
      expect(user.password).toBe('hashed_password');
    });
  });
});
