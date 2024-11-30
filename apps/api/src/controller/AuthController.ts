import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils/response';
import { z } from 'zod';
import { loginSchema, registerSchema } from '../schema/auth';
import { REDIS_USER_KEY } from '../config/redis';
import bcryptjs from 'bcryptjs';
import Redis from 'ioredis';
import { generateToken } from '../utils/jwt';

const redis = new Redis();

const login = async (req: Request, res: Response) => {
  try {
    const body = req.body as z.infer<typeof loginSchema>;

    // check if user exists in cache
    const redisUser = await redis.get(REDIS_USER_KEY);

    const users = redisUser ? JSON.parse(redisUser) : [];

    let user = users.find((u) => u.email === body.email);
    if (!user) {
      return errorResponse(
        res,
        'Email or password is incorrect',
        undefined,
        404
      );
    }

    const passwordMatch = await bcryptjs.compare(body.password, user.password);
    if (!passwordMatch) {
      return errorResponse(
        res,
        'Email or password is incorrect',
        undefined,
        404
      );
    }

    user = { ...user, password: undefined };
    const createToken = generateToken(user);

    return successResponse(res, { user: user, token: createToken });
  } catch (error) {
    return errorResponse(res, 'Something Went Wrong', error);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as z.infer<
      typeof registerSchema
    >;

    // check if user exists in cache
    const redisUser = await redis.get(REDIS_USER_KEY);
    const users = redisUser ? JSON.parse(redisUser) : [];

    const user = users.find((u) => u.email === email);
    if (user) {
      return errorResponse(res, 'User already exists', undefined, 400);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);
    await redis.set(REDIS_USER_KEY, JSON.stringify(users));

    return successResponse(res, newUser, 201);
  } catch (error) {
    return errorResponse(res, 'Something Went Wrong', error);
  }
};

const user = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const user = req.user;

    return successResponse(res, user);
  } catch (error) {
    return errorResponse(res, 'Something Went Wrong', error);
  }
};

const listUser = async (req: Request, res: Response) => {
  try {
    const users = await redis.get(REDIS_USER_KEY);

    const parsedUsers = users ? JSON.parse(users) : [];

    return successResponse(res, parsedUsers);
  } catch (error) {
    return errorResponse(res, 'Something Went Wrong', error);
  }
};

export default { login, register, user, listUser };
