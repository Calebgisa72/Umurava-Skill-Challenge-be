import jwt from 'jsonwebtoken';
import { AppError, ErrorCodes } from './errors.utils';

const secretKey = process.env.JWT_SECRET!;

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, secretKey, { expiresIn: process.env.JWT_TOKEN_EXPIRE || '5h' });
};

export const verifyToken = (token: string): any => {
  try {
    if (!secretKey) throw new AppError('Missing secret key', 500, ErrorCodes.INTERNAL_ERROR);
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new AppError('Invalid Token', 401, ErrorCodes.INVALID_TOKEN);
  }
};
