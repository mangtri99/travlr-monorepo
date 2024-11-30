// create auth middleware
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { errorResponse } from '../utils/response';
import { verifyToken } from '../utils/jwt';

const authMiddleware = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return errorResponse(res, 'Unauthorized', 401);
    }

    try {
      const user = verifyToken(token);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      req.user = user;

      next();
    } catch (err) {
      return errorResponse(res, 'Invalid Token', 401);
    }
  };
};

export { authMiddleware };
