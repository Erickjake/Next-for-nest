'use server';

import { createLoginSessionFromApi } from '@/src/lib/login/manage-login';
import { loginSchema } from '@/src/lib/login/schemas';
import { apiRequest } from '@/src/utils/api-request';
import { getZodErrorMessages } from '@/src/utils/get-Zod-Error-message';
import { redirect } from 'next/navigation';

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      email: '',
      errors: ['Login not allowed'],
    };
  }

  // const isBot = await verifyHoneypotInput(formData, 5000);

  // if (isBot) {
  //   return {
  //     email: '',
  //     errors: ['nice'],
  //   };
  // }

  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Dados inválidos'],
    };
  }

  // Validar
  const formObj = Object.fromEntries(formData.entries());
  const formEmail = formObj?.email?.toString() || '';
  const parsedFormData = loginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formEmail,
      errors: getZodErrorMessages(parsedFormData.error.format()),
    };
  }

  // Fetch
  const loginResponse = await apiRequest<{ accessToken: string }>(
    '/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!loginResponse.success) {
    return {
      email: formEmail,
      errors: loginResponse.errors,
    };
  }

  await createLoginSessionFromApi(loginResponse.data.accessToken);
  redirect('/admin/post');
}
