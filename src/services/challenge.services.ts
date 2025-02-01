import Challenge, { IChallenge } from '../models/challenge.model';
import { ErrorCodes, AppError } from '../utils/errors.utils';

export const createChallengeService = async (challenge: IChallenge) => {
  const existingChallenge = await Challenge.findOne({ title: challenge.title });

  if (existingChallenge) throw new AppError('Challenge already created', 409, ErrorCodes.DATA_CONFLICT);

  const newChallenge = await Challenge.create(challenge);

  const message = 'Challenge created successfully.';
  const statusCode = 201;

  return { newChallenge, message, statusCode };
};

export const fetchChallengeService = async (id: string) => {
  const challenge = await Challenge.findById(id);

  if (!challenge) {
    throw new AppError('Challenge not found', 404, ErrorCodes.RESOURCE_NOT_FOUND);
  }

  const sanitizedChallengeInfo = challenge.toObject();

  return {
    sanitizedChallengeInfo,
    message: 'Challenge retrieved successfully.',
    statusCode: 200,
  };
};

export const fetchAllChallengeService = async () => {
  const challenges = await Challenge.find();

  return {
    challenges,
    message: 'All challenges retrieved successfully.',
    statusCode: 200,
  };
};

export const updateChallengeService = async (id: string, updates: Partial<IChallenge>) => {
  const updatedChallenge = await Challenge.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedChallenge) {
    throw new AppError('Challenge not found or update failed', 404, ErrorCodes.RESOURCE_NOT_FOUND);
  }

  const sanitizedChallengeInfo = updatedChallenge.toObject();

  return {
    sanitizedChallengeInfo,
    message: 'Challenge updated successfully.',
    statusCode: 200,
  };
};

export const deleteChallengeService = async (id: string) => {
  const deletedChallenge = await Challenge.findByIdAndDelete(id);

  if (!deletedChallenge) {
    throw new AppError('Challenge not found or delete failed', 404, ErrorCodes.RESOURCE_NOT_FOUND);
  }

  return {
    message: 'Challenge deleted successfully.',
    statusCode: 200,
  };
};
