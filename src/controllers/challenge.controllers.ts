import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../utils/responses.utils';
import { AppFailure } from '../utils/errors.utils';
import { challengeValidationSchema } from '../validators/challenge.validation';
import {
  createChallengeService,
  deleteChallengeService,
  fetchAllChallengeService,
  fetchChallengeService,
  updateChallengeService,
} from '../services/challenge.services';
import { updateProfileValidationSchema } from '../validators/user.validation';

export const createChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppFailure('Authorization required. Please log in.', 401);
    }
    const { error } = challengeValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) throw error;

    const { newChallenge, message, statusCode } = await createChallengeService(req.body);

    successResponse(res, statusCode, message, { challenge: newChallenge });
    return;
  } catch (error) {
    next(error);
  }
};

export const fetchChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppFailure('Authorization required. Please log in.', 401);
    }
    if (!req.params.id) {
      throw new AppFailure('No challenge ID provided.', 400);
    }

    const { sanitizedChallengeInfo, message, statusCode } = await fetchChallengeService(req.params.id);

    successResponse(res, statusCode, message, { challenge: sanitizedChallengeInfo });
  } catch (error) {
    next(error);
  }
};

export const fetchAllChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppFailure('Authorization required. Please log in.', 401);
    }

    const { challenges, message, statusCode } = await fetchAllChallengeService();

    successResponse(res, statusCode, message, { challenges });
  } catch (error) {
    next(error);
  }
};

export const updateChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppFailure('Authorization required. Please log in.', 401);
    }
    if (!req.params.id) {
      throw new AppFailure('No challenge ID provided to update.', 400);
    }

    const { error } = updateProfileValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) throw error;

    const { sanitizedChallengeInfo, message, statusCode } = await updateChallengeService(req.params.id, req.body);

    successResponse(res, statusCode, message, { challenge: sanitizedChallengeInfo });
  } catch (error) {
    next(error);
  }
};

export const daleteChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppFailure('Authorization required. Please log in.', 401);
    }

    if (!req.params.id) {
      throw new AppFailure('No challenge ID provided to delete.', 400);
    }

    const { message, statusCode } = await deleteChallengeService(req.params.id);

    successResponse(res, statusCode, message);
  } catch (error) {
    next(error);
  }
};
