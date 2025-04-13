'use server'

import { cookies } from 'next/headers';

const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'Admin@123';
const AUTH_COOKIE_NAME = 'auth-token';

export async function login(email: string, password: string): Promise<boolean> {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // No need to await cookies() - it's synchronous in current Next.js versions
    cookies().set({
      name: AUTH_COOKIE_NAME,
      value: 'authenticated',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return true;
  }
  return false;
}

export async function logout(): Promise<void> {
  cookies().delete(AUTH_COOKIE_NAME);
}

export async function checkAuth(): Promise<boolean> {
  const authCookie = cookies().get(AUTH_COOKIE_NAME);
  return authCookie?.value === 'authenticated';
}