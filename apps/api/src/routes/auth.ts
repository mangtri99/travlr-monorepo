import { Router } from 'express';
const router = Router();

import authController from '../controller/AuthController';
import { validateRequestBody } from '../utils/validation';
import { loginSchema, registerSchema } from '../schema/auth';
import { authMiddleware } from '../middleware/authMiddleware';

router.post('/login', validateRequestBody(loginSchema), authController.login);
router.get('/user', authController.user);
router.get('/user/list', authController.listUser);
router.post(
  '/register',
  validateRequestBody(registerSchema),
  authController.register
);

export default router;
