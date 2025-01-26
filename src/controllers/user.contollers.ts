import { NextFunction, Request, Response } from 'express';
import {
  signupValidationSchema,
  loginValidationSchema,
  updateProfileValidationSchema,
} from '../validators/user.validation';
import { successResponse } from '../utils/responses.utils';
import { createUserService, loginUserService, updateUserProfileService } from '../services/user.services';
import { AppFailure } from '../utils/errors.utils';

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

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppFailure('Authorization required. Please log in.', 401);
    }

    const { error } = updateProfileValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) throw error;

    const { sanitizedUserInfo, message, statusCode } = await updateUserProfileService({
      userId: req.user.id,
      ...req.body,
    });

    successResponse(res, statusCode, message, { user: sanitizedUserInfo });
    return;
  } catch (error) {
    next(error);
  }
};
