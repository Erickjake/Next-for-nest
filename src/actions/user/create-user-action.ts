'use server';
import {
  CreateUserSchema,
  PublicUserDto,
  PublicUserSchema,
} from '@/src/lib/user/schemas';
import { apiRequest } from '@/src/utils/api-request';
import { getZodErrorMessages } from '@/src/utils/get-Zod-Error-message';
import { verifyHoneypotInput } from '@/src/utils/verify-honeypot-input';
import { redirect } from 'next/navigation';

type CreateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  const isBot = await verifyHoneypotInput(formData, 5600);
  if (isBot) {
    return {
      user: state.user,
      errors: ['Se você está preenchendo este campo, você está um robô.'],
      success: false,
    };
  }
  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ['Invalid form data.'],
      success: false,
    };
  }
  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateUserSchema.safeParse(formObj);
  if (!parsedFormData.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  const createUserResponse = await apiRequest<PublicUserDto>('/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsedFormData.data),
  });

  if (!createUserResponse.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: createUserResponse.errors,
      success: createUserResponse.success,
    };
  }

  redirect('/login?created=1');
}
