// create routes for the controller

import { Router } from 'express';
import productController from '../controller/ProductController';
import { validateRequestBody } from '../utils/validation';
import { productSchema } from '../schema/product';
import { PRODUCT_SERVICE_PATH } from '../config/url';

const router = Router();

router.get(PRODUCT_SERVICE_PATH.index, productController.allProducts);
router.get(PRODUCT_SERVICE_PATH.detail, productController.showProduct);
router.post(
  PRODUCT_SERVICE_PATH.index,
  validateRequestBody(productSchema),
  productController.storeProduct
);
router.put(
  PRODUCT_SERVICE_PATH.detail,
  validateRequestBody(productSchema),
  productController.updateProduct
);
router.delete(PRODUCT_SERVICE_PATH.detail, productController.deleteProduct);

export default router;
