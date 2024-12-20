export interface APIResponse<T> {
  data: T;
}

export interface Paginations {
  page: number;
  perPage: number;
  total: number;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  description?: string;
  stock: number;
  status: 'available' | 'pending' | 'sold';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductReportSummary {
  totalProductByStatus: {
    [key: string]: number;
  };
  top5MostExpensiveProduct: Product[];
  top5MostCheapestProduct: Product[];
  totalStock: number;
  totalProduct: number;
}
