import { hashPassword } from '../lib/login/manage-login';

(async () => {
  const password = '';
  const hashedPassword = await hashPassword(password);
  console.log({ hashedPassword });
})();
