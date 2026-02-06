'use server';

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from '@/src/dto/post/dto';
import { PostUpdateSchema } from '@/src/lib/post/validation';
import { postRepository } from '@/src/repositories/post';
import { makeRandomString } from '@/src/utils/make-random-string';
import { updateTag } from 'next/cache';
import { ZodFormattedError } from 'zod';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  // TODO: verificar se o usuário tá logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID inválido'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Erro desconhecido'],
    };
  }

  updateTag('posts');
  updateTag(`post-${post.slug}`);

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: makeRandomString(),
  };
}
function getZodErrorMessages(
  arg0: ZodFormattedError<
    {
      title?: string;
      content?: string;
      author?: string;
      excerpt?: string;
      coverImageUrl?: string;
      published?: boolean;
    },
    string
  >,
): string[] {
  return Object.values(arg0)
    .flatMap(field => (field && '_errors' in field ? field._errors : []))
    .filter(Boolean);
}
