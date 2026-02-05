'use server';

import { postRepository } from '@/src/repositories/post';
import { logColor } from '@/src/utils/log-color';
import { updateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  logColor('' + id, 'red');

  if (!id || typeof id !== 'string') {
    return {
      error: 'ID inválido fornecido para exclusão do post.',
    };
  }

  let post;

  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
    return {
      error: 'Erro ao excluir o post.',
    };
  }
  updateTag('posts');
  updateTag(`post-${post.slug}`);
  return {
    error: '',
  };
}
