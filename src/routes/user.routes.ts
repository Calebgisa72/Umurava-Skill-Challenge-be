import { Router } from 'express';
import { loginUser, signupUser } from '../controllers/user.contollers';

const router = Router();

router.post('/register', signupUser);
router.post('/login', loginUser);
// router.put('/profile', updateProfile);

export default router;
