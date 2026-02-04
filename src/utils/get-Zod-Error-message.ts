import { ZodFormattedError } from 'zod';

export function getZodErrorMessage<T>(error: ZodFormattedError<T>): string[] {
  return Object.values(error)
    .map(field => {
      if (Array.isArray(field)) return field;
      return field && typeof field === 'object' && '_errors' in field
        ? field._errors
        : [];
    })
    .filter(Boolean)
    .flat();
}
