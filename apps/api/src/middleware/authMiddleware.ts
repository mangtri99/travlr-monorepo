// create auth middleware
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { errorResponse } from '../utils/response';
import { verifyToken } from '../utils/jwt';

const authMiddleware = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log('auth middleware');
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    console.log('token', token);
    if (!token) {
      return errorResponse(res, 'Unauthorized', 401);
    }

    try {
      const user = verifyToken(token);

      console.log('user', user);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      req.user = user;

      next();
    } catch (err) {
      console.log('err', err);
      return errorResponse(res, 'Invalid Token', 401);
    }
  };
};

export { authMiddleware };
