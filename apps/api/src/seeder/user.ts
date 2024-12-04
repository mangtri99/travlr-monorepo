import bcryptjs from 'bcryptjs';
import { REDIS_SERVICE_INIT, REDIS_USER_KEY } from '../config/redis';

const redis = REDIS_SERVICE_INIT;
const userSeeder = async (count = 1) => {
  // generate users
  const users = [];

  const cachedUsers = (await redis.get(REDIS_USER_KEY)) || '[]';
  const getUsers = JSON.parse(cachedUsers);

  let latestUserId = 0;
  if (getUsers.length > 0) {
    latestUserId = Number(getUsers[getUsers.length - 1].id);
  }

  for (let i = 0; i < count; i++) {
    const hashedPassword = await bcryptjs.hash('password', 10);
    const user = {
      id: latestUserId + i + 1,
      name: `User ${latestUserId + i + 1}`,
      email: `user${latestUserId + i + 1}@gmail.com`,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(user);
  }

  if (getUsers.length === 0) {
    await redis.set(REDIS_USER_KEY, JSON.stringify(users));
  } else {
    const newUsers = [...getUsers, ...users];
    await redis.set(REDIS_USER_KEY, JSON.stringify(newUsers));
  }

  return true;
};

export default userSeeder;
