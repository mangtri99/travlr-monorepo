import { Router } from 'express';
import seederController from '../controller/SeederController';

const router = Router();

router.get('/user', seederController.userSeed);
router.get('/product', seederController.productSeed);

export default router;
