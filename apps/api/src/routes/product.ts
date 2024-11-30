// create routes for the controller

import { Router } from 'express';
import productController from '../controller/ProductController';
import { validateRequestBody } from '../utils/validation';
import { productSchema } from '../schema/product';

const router = Router();

router.get('/', productController.allProducts);
router.get('/:id', productController.showProduct);
router.post(
  '/',
  validateRequestBody(productSchema),
  productController.storeProduct
);
router.put(
  '/:id',
  validateRequestBody(productSchema),
  productController.updateProduct
);
router.delete('/:id', productController.deleteProduct);

export default router;
