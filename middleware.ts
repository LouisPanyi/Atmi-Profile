import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Ambil token session user
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // Cek apakah user sedang mengakses halaman admin
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin');

  if (isAdminPage) {
    // 1. Jika belum login sama sekali -> lempar ke login
    if (!token) {
      const url = new URL('/login', req.url);
      url.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    
    // 2. Jika sudah login tapi rolenya BUKAN admin/news_writer -> lempar ke kontak
    const userRole = token.role as string;
    const allowedRoles = ['admin', 'news_writer'];
    
    if (!allowedRoles.includes(userRole)) {
       // Redirect user biasa ke halaman kontak
       return NextResponse.redirect(new URL('/kontak', req.url));
    }
  }
  
  return NextResponse.next();
}

// Tentukan path mana saja yang dicek oleh middleware
export const config = {
  matcher: ['/admin/:path*'],
};