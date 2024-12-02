import { PRODUCT_SERVICE } from '../../config/url';
import { FetchApi } from '../../utils/api';
import { auth } from '../../utils/auth';
// import { APIResponse } from '../../utils/types';
import ProductSummary from './_components/ProductSummary';

export default async function Index({ params }: any) {
  const session = await auth();

  const $http = FetchApi(session);

  const response = await $http(`${PRODUCT_SERVICE}/report/summary`, {
    method: 'GET',
  });
  return (
    <div className="w-full h-full min-h-screen">
      <ProductSummary data={response.data.data} />
    </div>
  );
}
