import { Request, Response } from 'express';
import Redis from 'ioredis';
import { z } from 'zod';
import { productSchema } from '../schema/product';
import { errorResponse, successResponse } from '../utils/response';
import { REDIS_PRODUCTS_KEY } from '../config/redis';

const redis = new Redis();

const allProducts = async (req: Request, res: Response) => {
  // get query params
  const { perPage = 10, page = 1, search } = req.query;

  // get cached products
  const cachedProducts = await redis.get(REDIS_PRODUCTS_KEY);
  if (cachedProducts) {
    let getProducts = JSON.parse(cachedProducts);
    // if search query is provided
    if (search) {
      getProducts = getProducts.filter((product) =>
        product.name.toLowerCase().includes(String(search).toLowerCase())
      );
    }

    // calculate pagination
    const start = page ? (Number(page) - 1) * Number(perPage) : 0;
    const end = start + Number(perPage);
    const products = getProducts.slice(start, end);

    return successResponse(res, {
      products,
      paginations: {
        page: Number(page),
        perPage: Number(perPage),
        total: getProducts.length,
      },
    });
  } else {
    // return empty array if no products in cache
    return successResponse(res, []);
  }
};

const showProduct = async (req: Request, res: Response) => {
  // get product id from request params
  const { id } = req.params;
  // search product in cache
  const cachedProducts = await redis.get(REDIS_PRODUCTS_KEY);
  if (cachedProducts) {
    const products = JSON.parse(cachedProducts);
    const product = products.find((product) => product.id === Number(id));
    if (product) {
      return successResponse(res, product);
    } else {
      return errorResponse(res, 'Product not found', undefined, 404);
    }
  } else {
    return errorResponse(res, 'Product not found', undefined, 404);
  }
};

const storeProduct = async (req: Request, res: Response) => {
  // store product in cache
  try {
    const { name, price, description, status, stock } = req.body as z.infer<
      typeof productSchema
    >;

    // get cached products
    const cachedProducts = await redis.get(REDIS_PRODUCTS_KEY);
    let products = [];
    if (cachedProducts) {
      products = JSON.parse(cachedProducts);
    }

    // create new product
    const newProduct = {
      id: products.length + 1,
      name,
      price,
      description,
      stock: stock || 0,
      status: status || 'available',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    products.push(newProduct);
    await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify(products));
    return successResponse(res, newProduct, 201);
  } catch (error) {
    return errorResponse(res, 'Something Went Wrong', error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock, status } = req.body as z.infer<
      typeof productSchema
    >;

    // get cached products
    const cachedProducts = await redis.get(REDIS_PRODUCTS_KEY);
    let products = [];
    if (cachedProducts) {
      products = JSON.parse(cachedProducts);
    }

    // find product by id
    const productIndex = products.findIndex(
      (product) => product.id === Number(id)
    );
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        name,
        price,
        description,
        stock: stock || 0,
        status: status || 'available',
        updatedAt: new Date(),
      };

      await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify(products));
      return successResponse(res, products[productIndex]);
    } else {
      return errorResponse(res, 'Product not found', undefined, 404);
    }
  } catch (error) {
    return errorResponse(res, 'Something Went Wrong', error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // get cached products
    const cachedProducts = await redis.get(REDIS_PRODUCTS_KEY);
    let products = [];
    if (cachedProducts) {
      products = JSON.parse(cachedProducts);
    }

    // find product by id
    const productIndex = products.findIndex(
      (product) => product.id === Number(id)
    );
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      await redis.set(REDIS_PRODUCTS_KEY, JSON.stringify(products));
      return successResponse(res, {}, 204);
    } else {
      return errorResponse(res, 'Product not found', undefined, 404);
    }
  } catch (error) {
    return errorResponse(res, 'Something Went Wrong', error);
  }
};

export default {
  allProducts,
  showProduct,
  storeProduct,
  updateProduct,
  deleteProduct,
};
