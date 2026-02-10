'use server';

import { verifyLoginSession } from '@/src/lib/login/manage-login';
import { postRepository } from '@/src/repositories/post';
import { logColor } from '@/src/utils/log-color';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  logColor('ID para exclusão:', id);
  const isAuth = await verifyLoginSession();
  if (!isAuth) {
    return {
      error: 'Faça login para excluir um post.',
    };
  }

  if (!id || typeof id !== 'string') {
    return {
      error: 'ID inválido fornecido para exclusão do post.',
    };
  }

  try {
    // Buscamos o post antes de deletar para obter o slug para revalidação
    const post = await postRepository.findByID(id);
    if (!post) {
      return {
        error: 'Post não encontrado.',
      };
    }
    await postRepository.delete(id);
    revalidateTag('posts', post.slug || '');
    revalidateTag(`post-${post.slug}`, post.slug || '');
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
  return {
    error: '',
  };
}
