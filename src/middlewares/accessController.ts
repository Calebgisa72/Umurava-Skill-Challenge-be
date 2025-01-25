// RBAC Middleware
import { Request, Response, NextFunction } from 'express';
import { AppFailure } from '../utils/errors.utils';
import User, { UserRole } from '../models/user.model';

export const accessController = (roles: UserRole[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AppFailure('Authentication required', 401);
    }

    const userId = req.user.id;

    const user = await User.findById(userId);

    let isAllowed = false;

    for (const role of roles) {
      if (user?.role === role) {
        isAllowed = true;
        break;
      }
    }

    if (!isAllowed) {
      throw new AppFailure('Permission denied', 403, {
        description: 'User does not have the required role.',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
