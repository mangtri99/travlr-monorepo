import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  validateRequestBody,
  validateRequestParams,
  validateRequestQuery,
} from '../../utils/validation';

describe('Validation Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  const runMiddleware = async (
    middleware: any,
    req: Partial<Request>,
    res: Partial<Response>,
    next: NextFunction
  ) => {
    await middleware(req as Request, res as Response, next);
  };

  describe('validateRequestBody', () => {
    const schema = z.object({
      name: z.string(),
    });

    it('should call next if validation passes', async () => {
      req.body = { name: 'John' };

      await runMiddleware(validateRequestBody(schema), req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 if validation fails', async () => {
      req.body = { name: 123 };

      await runMiddleware(validateRequestBody(schema), req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Invalid data',
          errors: expect.any(Array),
        })
      );
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateRequestParams', () => {
    const schema = z.object({
      id: z.string().uuid(),
    });

    it('should call next if validation passes', async () => {
      req.params = { id: '123e4567-e89b-12d3-a456-426614174000' };

      await runMiddleware(validateRequestParams(schema), req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 if validation fails', async () => {
      req.params = { id: 'invalid-uuid' };

      await runMiddleware(validateRequestParams(schema), req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Invalid data',
          errors: expect.any(Array),
        })
      );
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateRequestQuery', () => {
    const schema = z.object({
      search: z.string().min(3),
    });

    it('should call next if validation passes', async () => {
      req.query = { search: 'test' };

      await runMiddleware(validateRequestQuery(schema), req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 if validation fails', async () => {
      req.query = { search: 'a' };

      await runMiddleware(validateRequestQuery(schema), req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Invalid data',
          errors: expect.any(Array),
        })
      );
      expect(next).not.toHaveBeenCalled();
    });
  });
});
