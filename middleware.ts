import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;
    const path = req.nextUrl.pathname;

    // 1. Proteksi Halaman Manajemen User (Hanya Admin)
    if (path.startsWith("/admin/users") && role !== "admin") {
      // Jika news_writer coba akses user management, lempar ke dashboard
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // 2. Proteksi Umum (Admin & News Writer boleh masuk dashboard & berita)
    if (!["admin", "news_writer"].includes(role as string)) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};