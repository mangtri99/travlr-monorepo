import { auth } from '../../../utils/auth';
import ProductList from '../_components/ProductList';
import { FetchApi } from '../../..//utils/api';
import { PRODUCT_SERVICE } from '../../../config/url';
import { APIResponse, Paginations, Product } from '../../../utils/types';

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
      <h1 className="mb-4 text-2xl font-bold">Product List</h1>
      <ProductList products={products} paginations={paginations} />
    </div>
  );
}
