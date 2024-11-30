import { Response } from 'express';

export const successResponse = (res: Response, data: any, status = 200) => {
  res.status(status).json({ data });
};

export const errorResponse = (
  res: Response,
  message: string,
  errors: any,
  status = 400
) => {
  res.status(status).json({ message, errors });
};
