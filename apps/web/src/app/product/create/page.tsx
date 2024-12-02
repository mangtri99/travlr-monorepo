import { SessionProvider } from 'next-auth/react';
import { auth } from '../../../utils/auth';
import ProductForm from '../_components/ProductForm';

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
