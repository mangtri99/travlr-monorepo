'use client';

// library imports
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { $http } from '../../utils/http';

export default function Profile() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    console.log('baseUrl', baseUrl);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (session?.accessToken) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      getUserProfile(session.accessToken);
    } else {
      // Redirect to `/login` if no access token or no session
      router.push('/auth/login?next=' + pathname);
    }
    console.log('session', session);
  }, []);

  const getUserProfile = async (token: string) => {
    setLoadingProfile(true);

    try {
      const response = await $http('/auth/user', {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      });
      console.log('response', response);
      setLoadingProfile(false);
    } catch (error) {
      console.error(error);
      setLoadingProfile(false);
    }
  };

  return (
    <>
      {' '}
      {loadingProfile ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>User Profile</p>
          <p>Name: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
        </div>
      )}
    </>
  );
}
