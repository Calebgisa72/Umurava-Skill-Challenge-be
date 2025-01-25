import { Router } from 'express';
import { loginUser, signupUser, updateProfile } from '../controllers/user.contollers';
import authorize from '../middlewares/authorize';

const router = Router();

router.post('/register', signupUser);
router.post('/login', loginUser);
router.put('/profile', authorize, updateProfile);

export default router;
