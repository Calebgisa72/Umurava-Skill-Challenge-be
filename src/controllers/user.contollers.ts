import { NextFunction, Request, Response } from 'express';
import { signupValidationSchema, loginValidationSchema } from '../validators/user.validation';
import { successResponse } from '../utils/responses.utils';
import { createUserService, loginUserService } from '../services/user.services';

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = signupValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) throw error;

    const { sanitizedUserInfo, message, statusCode } = await createUserService({ ...req.body });

    successResponse(res, statusCode, message, { user: sanitizedUserInfo });
    return;
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = loginValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) throw error;

    const { token, message, statusCode } = await loginUserService({ ...req.body });

    successResponse(res, statusCode, message, { token });
    return;
  } catch (error) {
    next(error);
  }
};
