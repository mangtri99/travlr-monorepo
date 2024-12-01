import { Router } from 'express';
import authController from '../controller/AuthController';
import { validateRequestBody } from '../utils/validation';
import { loginSchema, registerSchema } from '../schema/auth';
import { authMiddleware } from '../middleware/authMiddleware';
import { AUTH_SERVICE_PATH } from '../config/url';

const router = Router();

router.post(
  AUTH_SERVICE_PATH.login,
  validateRequestBody(loginSchema),
  authController.login
);
router.post(AUTH_SERVICE_PATH.logout, [authMiddleware], authController.logout);
router.get(AUTH_SERVICE_PATH.user, [authMiddleware], authController.user);
router.get(AUTH_SERVICE_PATH.userList, authController.listUser);
router.post(
  '/register',
  validateRequestBody(registerSchema),
  authController.register
);

export default router;
