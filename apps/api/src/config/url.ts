export const BASE_API_URL = '/api';

export const BASE_API_URL_AUTH = `${BASE_API_URL}/auth`;
export const BASE_API_URL_PRODUCTS = `${BASE_API_URL}/products`;

export const AUTH_SERVICE_PATH = {
  login: '/login',
  logout: '/logout',
  register: '/register',
  user: '/user',
  userList: '/user/list',
};

export const PRODUCT_SERVICE_PATH = {
  index: '/',
  detail: '/:id',
};
