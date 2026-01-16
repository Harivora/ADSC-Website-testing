import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin pages have their own built-in API key authentication
  // No middleware blocking needed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
