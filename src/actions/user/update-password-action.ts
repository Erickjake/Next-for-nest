'use server';

import { deleteLoginSession } from '@/src/lib/login/manage-login';
import { getPublicUserFromApi } from '@/src/lib/user/api/get-user';
import { UpdatePasswordSchema } from '@/src/lib/user/schemas';
import { authenticatedApiRequest } from '@/src/utils/authenticated-api-request';
import { getZodErrorMessages } from '@/src/utils/get-Zod-Error-message';
import { redirect } from 'next/navigation';

type UpdatePasswordActionState = {
  errors: string[];
  success: boolean;
};

export async function updatePasswordAction(
  state: UpdatePasswordActionState,
  formData: FormData,
): Promise<UpdatePasswordActionState> {
  const user = await getPublicUserFromApi();
  if (!user) {
    await deleteLoginSession();
    return {
      errors: ['Você precisa fazer login novamente'],
      success: false,
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formObject = Object.fromEntries(formData.entries());
  const parsedFormData = UpdatePasswordSchema.safeParse(formObject);
  if (!parsedFormData.success) {
    return {
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const updatePasswordResponse =
    await authenticatedApiRequest<UpdatePasswordActionState>(
      `/user/me/password`,
      {
        method: 'PATCH',
        body: JSON.stringify(parsedFormData.data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  if (!updatePasswordResponse.success) {
    return {
      errors: updatePasswordResponse.errors,
      success: false,
    };
  }
  await deleteLoginSession();
  redirect('/login?userChanged=1');
}
