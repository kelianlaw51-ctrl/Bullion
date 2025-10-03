import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_KEY = process.env.ADMIN_KEY;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    // Allow requests to the login page to proceed
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    if (!ADMIN_KEY) {
      console.warn('ADMIN_KEY is not set. Denying access to /admin.');
      return new Response('Unauthorized: Admin key not configured', { status: 500 });
    }

    const key = request.cookies.get('admin-key')?.value;
    if (key !== ADMIN_KEY) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}
