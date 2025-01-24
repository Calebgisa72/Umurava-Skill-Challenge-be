import { Router, Request, Response } from 'express';
import { loginUser, signupUser } from '../controllers/user.contollers';
import { successResponse } from '../utils/responses.utils';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    successResponse(res, 200, 'user routes');
    return;
  });

router.post('/register', signupUser);
router.post('/login', loginUser);

export default router;
