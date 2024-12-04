import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './utils/auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  if (!session) {
    if (
      request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register')
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    if (
      request.nextUrl.pathname.startsWith('/login') ||
      request.nextUrl.pathname.startsWith('/register')
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/product/:path*', '/login', '/register'],
};
