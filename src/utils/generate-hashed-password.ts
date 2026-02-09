import { hashPassword } from '../lib/login/manage-login';

(async () => {
  const password = '123456';
  const hashedPassword = await hashPassword(password);
  console.log({ hashedPassword });
})();
