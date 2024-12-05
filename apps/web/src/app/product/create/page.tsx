import ProductForm from '../_components/ProductForm';
import { auth } from '../../../utils/auth';
import { SessionProvider } from 'next-auth/react';

export default async function Index() {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col">
        <ProductForm />
      </div>
    </SessionProvider>
  );
}
