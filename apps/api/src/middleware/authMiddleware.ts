// create auth middleware
import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils/response';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return errorResponse(res, 'Unauthorized', undefined, 401);
  }

  try {
    const user = verifyToken(token);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    req.user = user;

    next();
  } catch (err) {
    console.log('err', err);
    return errorResponse(res, 'Invalid Token', err, 401);
  }
};
