import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
import User from './app/models/User';

const router = Router();

router.post('/users', UserController.store);
router.post('/login', AuthController.authenticate);
router.get('/users', authMiddleware, UserController.index);

export default router;