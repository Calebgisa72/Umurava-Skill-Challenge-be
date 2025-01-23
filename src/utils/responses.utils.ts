import { Response } from 'express';
import { ErrorCodes } from './errors.utils';

export const successResponse = (res: Response, statusCode: number, message: string, data?: any): Response =>
  res.status(statusCode).json({
    status: statusCode === 207 ? 'multi_status' : 'success',
    message,
    data,
  });

export const failResponse = (res: Response, statusCode: number, message: string, details?: any): Response => {
  return res.status(statusCode).json({
    status: 'failure',
    message,
    details
  });
};

export const errorResponse = (
  res: Response,
  errors: unknown,
  statusCode: number,
  errorCode: ErrorCodes,
  message: string
): Response => {
  return res.status(statusCode).json({
    status: 'error',
    errorCode,
    message,
    errors: errors,
  });
};
