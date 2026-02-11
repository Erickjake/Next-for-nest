import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './src/lib/login/manage-login';

export async function proxy(req: NextRequest) {
  console.log('PROXY EXECUTOU', req.method, req.nextUrl.pathname);

  const isLoginPage = req.nextUrl.pathname.startsWith('/admin/login');
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
  const isGetRequest = req.method === 'GET';
  const shouldBeAuthenticated = isAdminPage && !isLoginPage;
  const shouldRedirect = shouldBeAuthenticated && !isGetRequest;

  if (!shouldRedirect) {
    return NextResponse.next();
  }

  const jwtSession = req.cookies.get(
    process.env.LOGIN_COOKIE_NAME || 'loginSession',
  )?.value;

  const isAuthenticated = await verifyJWT(jwtSession);
  if (!isAuthenticated) {
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
  console.log({ isAuthenticated });
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
