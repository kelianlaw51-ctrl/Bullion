"use server";

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const ADMIN_KEY = process.env.ADMIN_KEY;

export async function login(formData: FormData) {
  const key = formData.get('key');

  if (key === ADMIN_KEY) {
    const cookieStore = await cookies();
    cookieStore.set('admin-key', String(key), {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    redirect('/admin');
  } else {
    redirect('/admin/login?error=Invalid%20key');
  }
}
