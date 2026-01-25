'use server';

import { drizzleDb } from '@/src/db/drizzle';
import { postsTable } from '@/src/db/drizzle/schemas';
import { postRepository } from '@/src/repositories/post';
import { asyncDelay } from '@/src/utils/async-delay';
import { logColor } from '@/src/utils/log-color';
import { eq } from 'drizzle-orm';
import { cacheTag } from 'next/cache';

export async function deletePostAction(id: string) {
  'use cache';
  await asyncDelay(2000);
  logColor('' + id, 'red');

  if (!id || typeof id !== 'string') {
    return {
      error: 'ID inválido fornecido para exclusão do post.',
    };
  }
  const post = await postRepository.findByID(id).catch(() => undefined);
  if (!post) {
    return {
      error: 'Post não encontrado para o ID fornecido.',
    };
  }

  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));
  cacheTag('posts');
  cacheTag(`post-${post.slug}`);
  return {
    error: '',
  };
}
