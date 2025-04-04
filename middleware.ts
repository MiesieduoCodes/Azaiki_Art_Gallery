import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = ['/login', '/signup'].includes(path);
  const token = request.cookies.get('your-auth-token')?.value || '';

  // Redirect to login if trying to access protected path without auth
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Redirect away from login if already authenticated
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/login', '/signup'],
};