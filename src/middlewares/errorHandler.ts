import { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import { AppError, AppFailure, ErrorCodes } from '../utils/errors.utils';
import Joi from 'joi';
import { errorResponse, failResponse } from '../utils/responses.utils';
import { JsonWebTokenError } from 'jsonwebtoken';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  let customError: Error | AppFailure = err;

  // Mongoose errors
  if (err instanceof mongoose.Error.ValidationError) {
    customError = new AppError(err.message, 420, ErrorCodes.DATA_CONFLICT, err.errors);
  }
  if (err instanceof mongoose.Error.CastError) {
    customError = new AppFailure(`Invalid ${err.path}: ${err.value}`, 400, err.stack);
  }
  if (err.name === 'MongoServerError') {
    customError = new AppError(err.message, 400, ErrorCodes.DATABASE);
  }

  if (Joi.isError(err)) {
    const errorDetails = err.details.map((error) => ({
      field: error.path.join(', ') || 'unknown',
      message: error.message || 'Invalid input',
    }));
    customError = new AppFailure('Validation Error: Please ensure your input is correct.', 400, errorDetails);
  }
  // jwt errors
  if (err instanceof JsonWebTokenError) {
    switch (err.name) {
      case 'TokenExpiredError':
        customError = new AppError(
          'Token has expired. Please log in again.',
          401,
          ErrorCodes.EXPIRED_TOKEN,
          err.stack
        );
        break;
      case 'JsonWebTokenError':
        customError = new AppError(
          'Invalid token. Please log in again.',
          401,
          ErrorCodes.INVALID_TOKEN,
          err.stack
        );
        break;
      default:
        customError = new AppError('An authentication error occurred.', 401, ErrorCodes.UNAUTHORIZED, err.stack);
    }
  }

  // unknown errors
  if (!(customError instanceof AppError) && !(customError instanceof AppFailure)) {
    customError = new AppError('Internal Server Error', 500, ErrorCodes.INTERNAL_ERROR, { Error: err.stack });
  }

  if (customError instanceof AppFailure) {
    const { statusCode, message, details } = customError as AppFailure;
    failResponse(res, statusCode, message, details);
  } else {
    const { statusCode, message, errorCode, details } = customError as AppError;
    errorResponse(res, details, statusCode, errorCode, message);
  }

  return;
};

export default errorHandler;
