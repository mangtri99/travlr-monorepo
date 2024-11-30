// library imports
import { SessionProvider } from 'next-auth/react';

// internal imports
import { auth } from '../../utils/auth';

//component imports
import Profile from '../../components/profile';

export default async function ProfilePage() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Profile />
    </SessionProvider>
  );
}
