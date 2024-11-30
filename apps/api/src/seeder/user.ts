import Redis from 'ioredis';
import bcryptjs from 'bcryptjs';
import { REDIS_USER_KEY } from '../config/redis';

const redis = new Redis();
const userSeeder = async (count = 1) => {
  // generate users
  const users = [];
  for (let i = 0; i < count; i++) {
    const hashedPassword = await bcryptjs.hash('password', 10);
    const user = {
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@gmail.com`,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(user);
  }

  const cachedUsers = await redis.get(REDIS_USER_KEY);
  if (!cachedUsers) {
    await redis.set(REDIS_USER_KEY, JSON.stringify(users));
  } else {
    const parsedUsers = JSON.parse(cachedUsers);
    const newUsers = [...parsedUsers, ...users];
    await redis.set(REDIS_USER_KEY, JSON.stringify(newUsers));
  }

  return true;
};

export default userSeeder;
