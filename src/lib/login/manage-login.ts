import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXP_SECONDS) || 86400;
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || '1d';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

type JwtPayload = {
  username: string;
  expiresAt: Date;
};
export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hashedPassword).toString('base64');
  return base64;
}
export async function verifyPassword(password: string, base64Hash: string) {
  const hashedPassword = Buffer.from(base64Hash, 'base64').toString('utf-8');
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = await signJWT({ username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresAt,
  });
}
export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, '', { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}

export async function signJWT(jwtPayload: JwtPayload) {
  const jwt = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey);
  return jwt;
}

export async function verifyJWT(jwt: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ['HS256'],
    });
    return payload as JwtPayload;
  } catch (error) {
    console.error(error, 'JWT inválido');
    return false;
  }
}

export async function getLoginSession() {
  const cookieStore = await cookies();
  const loginSession = cookieStore.get(loginCookieName)?.value || '';
  if (!loginSession) return false;
  return verifyJWT(loginSession);
}

export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession();
  if (!jwtPayload) return false;
  return jwtPayload?.username === process.env.LOGIN_USER;
}

export async function requireLoginSession() {
  const isAuth = await getLoginSession();
  if (!isAuth) {
    redirect('/admin/login');
  }
}
