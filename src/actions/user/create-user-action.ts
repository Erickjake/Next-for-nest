'use server';
import {
  CreateUserSchema,
  PublicUserDto,
  PublicUserSchema,
} from '@/src/lib/user/schemas';
import { getZodErrorMessage } from '@/src/utils/get-Zod-Error-message';

type CreateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
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
      errors: getZodErrorMessage(parsedFormData.error.format()),
      success: false,
    };
  }

  const apiUrl = process.env.API_URL || 'http://localhost:3001';
  try {
    const response = await fetch(`${apiUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        user: PublicUserSchema.parse(formObj),
        errors: errorData.message || ['Failed to create user.'],
        success: false,
      };
    }
    const userData = await response.json();
    return {
      user: PublicUserSchema.parse(userData),
      errors: userData.message || [],
      success: true,
    };
  } catch (error) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors:
        error instanceof Error
          ? error.message.split(',')
          : ['An error occurred.'],
      success: false,
    };
  }
}
