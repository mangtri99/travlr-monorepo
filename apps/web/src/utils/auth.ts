// library imports
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// types imports
import type { NextAuthConfig, Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import axios from 'axios';

// declare module "next-auth" {
//   interface User extends UserType {}
// }

// declare module "next-auth/adapters" {
//   interface AdapterUser extends UserType {}
// }

// declare module "next-auth/jwt" {
//   interface JWT extends UserType {}
// }

const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      authorize: async (credentials) => {
        try {
          const { data } = await axios('/auth/login', {
            baseURL: process.env.NEXT_PUBLIC_BASE_URL,
            method: 'POST',
            data: credentials,
            headers: { 'Content-Type': 'application/json' },
          });
          return data.data || null;
        } catch (error) {
          console.error('Error during authentication', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, session, user }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        token.accessToken = user?.token ?? '';
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        token.user = user?.user ?? {};
      }
      // console.log('token jwt', token)
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        session.user = token.user ?? {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        session.accessToken = token.accessToken ?? '';
      }

      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
