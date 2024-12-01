import axios from 'axios';

export const FetchApi = (session?: any) => {
  const $http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken ?? ''}`,
      Accept: 'application/json',
    },
  });

  return $http;
};
