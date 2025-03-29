import { Router } from 'express';
import authorize from '../middlewares/authorize';
import { accessController } from '../middlewares/accessController';
import {
  createChallenge,
  daleteChallenge,
  fetchAllChallenge,
  fetchChallenge,
  updateChallenge,
} from '../controllers/challenge.controllers';
import { UserRole } from '../models/user.model';

const router = Router();

router.post('/create', authorize, accessController([UserRole.ADMIN]), createChallenge);
router.get('/', fetchAllChallenge);
router.get('/:id', fetchChallenge);
router.put('/:id', authorize, accessController([UserRole.ADMIN]), updateChallenge);
router.delete('/:id', authorize, accessController([UserRole.ADMIN]), daleteChallenge);

export default router;
