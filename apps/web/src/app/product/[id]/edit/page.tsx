import { auth } from '../../../../utils/auth';
import ProductForm from '../../_components/ProductForm';
import { APIResponse, Product } from '../../../../utils/types';
import { FetchApi } from '../../../../utils/api';
import { PRODUCT_SERVICE } from '../../../../config/url';

export default async function Index({ params }: any) {
  const session = await auth();

  const $http = FetchApi(session);

  const response = await $http<APIResponse<Product>>(
    `${PRODUCT_SERVICE}/${params.id}`,
    {
      method: 'GET',
    }
  );

  return (
    <div className="flex flex-col">
      <ProductForm defaultValues={response.data.data} isEdit />
    </div>
  );
}
