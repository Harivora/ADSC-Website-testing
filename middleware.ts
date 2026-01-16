import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Admin routes that require authentication
const ADMIN_ROUTES = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for an admin route
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));

  if (isAdminRoute) {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin_session')?.value;
    const validToken = process.env.NEWSLETTER_API_SECRET;

    // If no valid session, redirect to admin login
    if (!adminSession || adminSession !== validToken) {
      // Return 404 to hide admin routes from unauthorized users
      return new NextResponse(null, { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
