import bcrypt from 'bcryptjs';

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
