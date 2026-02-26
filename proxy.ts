import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  console.log('PROXY EXECUTOU', req.method, req.nextUrl.pathname);

  const isLoginPage = req.nextUrl.pathname.startsWith('/admin/login');
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
  const isGetRequest = req.method === 'GET';
  const shouldBeAuthenticated = isAdminPage && !isLoginPage;
  const shouldRedirect = shouldBeAuthenticated && isGetRequest;

  if (!shouldRedirect) {
    return NextResponse.next();
  }

  const jwtSession = req.cookies.get(
    process.env.LOGIN_COOKIE_NAME || 'loginSession',
  )?.value;

  const isAuthenticated = !!jwtSession;
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
