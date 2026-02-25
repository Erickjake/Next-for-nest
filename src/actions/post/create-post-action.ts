'use server';

import { makePartialPublicPost, PublicPost } from '@/src/dto/post/dto';
import { verifyLoginSession } from '@/src/lib/login/manage-login';
import { PostCreateSchema } from '@/src/lib/post/validation';
import { PostModel } from '@/src/models/post/post-model';
import { postRepository } from '@/src/repositories/post';
import { getZodErrorMessages } from '@/src/utils/get-Zod-Error-message';
import { makeSlugFromText } from '@/src/utils/make-slug-from-text';
import { updateTag } from 'next/cache'; // <--- CORREÇÃO 1
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

type createPostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: createPostActionState,
  formData: FormData,
): Promise<createPostActionState> {
  const isAuth = await verifyLoginSession();
  // 1. Validação de FormData
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['FormData inválido'],
    };
  }

  const formDataObject = Object.fromEntries(formData.entries());
  const zodParseObj = PostCreateSchema.safeParse(formDataObject);

  if (!isAuth) {
    return {
      formState: makePartialPublicPost(formDataObject),
      errors: ['Faça login para criar um post'],
    };
  }

  // 2. Validação do Schema Zod
  if (!zodParseObj.success) {
    const errors = getZodErrorMessages(zodParseObj.error.format());
    return {
      formState: makePartialPublicPost(formDataObject),
      errors: errors,
    };
  }

  const validPostData = zodParseObj.data;

  // 3. Preparação do Modelo
  const newPost: PostModel = {
    ...validPostData,
    id: uuidv4(),
    slug: makeSlugFromText(validPostData.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }
    return {
      formState: newPost,
      errors: ['Erro desconhecido'],
    };
  }
  updateTag('posts');
  redirect(`/admin/post/${newPost.id}?create=1`);
}
