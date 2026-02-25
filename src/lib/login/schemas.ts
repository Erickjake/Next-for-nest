import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido').trim(),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').trim(),
});
