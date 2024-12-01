export interface APIResponse<T> {
  data: T;
}

export interface Paginations {
  page: number;
  perPage: number;
  total: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
