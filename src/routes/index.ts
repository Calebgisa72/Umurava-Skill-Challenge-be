import { Router, Request, Response } from 'express';
import { successResponse } from '../utils/responses.utils';

const router = Router();

//Endpoint to test the API
router.get('/', (req: Request, res: Response) => {
  successResponse(res, 200, 'Welcome to the Skill Challenge API! Everything is running smoothly.');
  return;
});

export default router;
