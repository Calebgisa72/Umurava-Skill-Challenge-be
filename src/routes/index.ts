import { Router, Request, Response } from 'express';
import { successResponse } from '../utils/responses.utils';
import userRoutes from './user.routes';
import challengeRoutes from './challenge.routes';

const router = Router();

//Endpoint to test the API
router.get('/', (req: Request, res: Response) => {
  successResponse(res, 200, 'Welcome to the Skill Challenge API! Everything is running smoothly.');
  return;
});

router.use('/user', userRoutes);
router.use('/challenge', challengeRoutes);

export default router;
