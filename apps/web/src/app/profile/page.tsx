import { SessionProvider } from 'next-auth/react';
import { auth } from '../../utils/auth';
import Profile from '../../components/profile';

export default async function ProfilePage() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Profile />
    </SessionProvider>
  );
}
