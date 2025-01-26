import { Request, Response, NextFunction } from 'express';
import { AppError, AppFailure, ErrorCodes } from '../utils/errors.utils';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../models/user.model';
import { verifyToken } from '../utils/token.utils';
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    let decodedToken;

    if (authHeader === undefined) {
      throw new AppError('AuthHeader not field', 401, ErrorCodes.RESOURCE_NOT_FOUND);
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || token === undefined) {
      throw new AppFailure('Access denied. No token provided.', 401);
    }
    decodedToken = verifyToken(token);
    
    // User Authorization
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new AppFailure('User not found.', 404, {
        cause: 'The user ID in the token does not exist.',
      });
    }
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};
export default authorize;
