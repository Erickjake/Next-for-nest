'use server';

import {
  createLoginSession,
  verifyPassword,
} from '@/src/lib/login/manage-login';
import { asyncDelay } from '@/src/utils/async-delay';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};
export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return {
      username: '',
      error: 'Login não está permitido no momento',
    };
  }
  await asyncDelay(5000);

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'FormData inválido',
    };
  }

  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';
  // Validar os campos do formulário
  if (!username || !password) {
    return {
      username,
      error: 'Campos de usuário e senha são obrigatórios',
    };
  }

  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || '',
  );

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username,
      error: 'Usuário ou senha inválidos',
    };
  }

  await createLoginSession(username);
  redirect('/admin/post');
}
