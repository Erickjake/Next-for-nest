import z from 'zod';

const CreateUserBase = z.object({
  name: z.string().min(4, 'Nome precisa conter pelo menos 4 caracteres').trim(),
  email: z.string().email({ message: 'Email inválido' }).trim(),
  password: z
    .string()
    .min(8, 'Senha precisa conter pelo menos 8 caracteres')
    .trim(),
  password2: z
    .string()
    .min(8, 'Senha precisa conter pelo menos 8 caracteres')
    .trim(),
});

export const CreateUserSchema = CreateUserBase.refine(
  date => {
    return date.password === date.password2;
  },
  {
    path: ['password2'],
    message: 'As senhas precisam ser iguais',
  },
).transform(({ email, name, password }) => {
  return { email, name, password };
});

export const PublicUserSchema = z.object({
  id: z.string().default(''),
  name: z.string().default(''),
  email: z.string().email({ message: 'Email inválido' }).default(''),
});
export const UpdatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Senha precisa conter pelo menos 8 caracteres')
      .trim(),
    newPassword: z
      .string()
      .min(8, 'Senha precisa conter pelo menos 8 caracteres')
      .trim(),
    newPassword2: z
      .string()
      .min(8, 'Senha precisa conter pelo menos 8 caracteres')
      .trim(),
  })
  .refine(
    data => {
      return data.newPassword === data.newPassword2;
    },
    {
      path: ['newPassword2'],
      message: 'As senhas precisam ser iguais',
    },
  )
  .transform(({ currentPassword, newPassword }) => {
    return { currentPassword, newPassword };
  });

export const UpdateUserSchema = CreateUserBase.omit({
  password: true,
  password2: true,
}).extend({});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type PublicUserDto = z.infer<typeof PublicUserSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
