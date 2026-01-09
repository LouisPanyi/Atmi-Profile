import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    
    // A. Jika belum login -> Lempar ke Login
    if (!token) {
      const url = new URL('/login', req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    const userRole = token.role as string;

    if (userRole === 'user') {
      // Kembalikan ke halaman utama website (Home)
      return NextResponse.redirect(new URL('/', req.url));
    }

    // C. Proteksi Spesifik (Admin vs News Writer)
    // Area yang hanya boleh Admin (News Writer dilarang masuk sini)
    const superAdminPaths = ['/admin/users', '/admin/products', '/admin/settings'];
    const isSuperAdminPath = superAdminPaths.some(path => pathname.startsWith(path));

    if (isSuperAdminPath && userRole !== 'admin') {
      // Jika News Writer coba masuk dapur Admin -> Lempar ke Dashboard Berita
      return NextResponse.redirect(new URL('/admin/berita', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};