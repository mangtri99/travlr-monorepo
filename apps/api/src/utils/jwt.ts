import jwt from 'jsonwebtoken';

export const generateToken = (payload: any) => {
  return jwt.sign(
    payload,
    (process.env.JWT_SECRET_KEY as string) || 'your_secret',
    {
      expiresIn: '7d',
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(
    token,
    (process.env.JWT_SECRET_KEY as string) || 'your_secret'
  );
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
