import { PublicPost } from '@/src/dto/post/dto';
import { PostCreateSchema } from '@/src/lib/post/validation';
import { getZodErrorMessage } from '@/src/utils/get-Zod-Error-message';

type createPostActionState = {
  formState: PublicPost;
  erros: string[];
};
export async function createPostAction(
  prevState: createPostActionState,
  formData: FormData,
): Promise<createPostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      erros: ['FormData inválido'],
    };
  }

  const formDataObject = Object.fromEntries(formData.entries());
  const zodParseObj = PostCreateSchema.safeParse(formDataObject);

  if (!zodParseObj.success) {
    const errors = getZodErrorMessage(zodParseObj.error.format());
    return {
      formState: prevState.formState,
      erros: errors,
    };
  }
  return {
    formState: prevState.formState,
    erros: [],
  };
}
