import { auth } from '../../../utils/auth';
import ProductList from '../_components/ProductList';
import { FetchApi } from '../../..//utils/api';
import { PRODUCT_SERVICE } from '../../../config/url';
import { APIResponse, Paginations, Product } from '../../../utils/types';
import Link from 'next/link';
import Button from '../../../components/button';

export default async function Index({ searchParams }: any) {
  interface ResponseProduct {
    products: Product[];
    paginations: Paginations;
  }

  const session = await auth();

  const $http = FetchApi(session);

  let products: Product[] = [];
  let paginations: Paginations = { total: 0, page: 1, perPage: 10 };

  const response = await $http<APIResponse<ResponseProduct>>(PRODUCT_SERVICE, {
    method: 'GET',
    params: searchParams,
  });

  if (response.data) {
    products = response.data.data.products;
    paginations = response.data.data.paginations;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 ">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Link href="/product/create">
          <Button type="button" className="px-2 py-1">
            Add Product
          </Button>
        </Link>
      </div>
      <ProductList products={products} paginations={paginations} />
    </div>
  );
}
