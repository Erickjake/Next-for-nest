'use cache';
import { PostModel } from '@/src/models/post/post-model'; // Confirme o caminho
import { postRepository } from '@/src/repositories/post';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

// A tipagem : Promise<PostModel[]> deve ficar DEPOIS dos parênteses do async
export const findAllPublicPostsCached = cache(
  async (): Promise<PostModel[]> => {
    cacheLife('seconds');
    cacheTag('posts');
    // Remova o ": Promise<...>" desta linha abaixo
    const posts = await postRepository.findAllPublic();
    return posts;
  },
);
export const findPublicPostBySlugCached = cache(async (slug: string) => {
  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);
  cacheLife('seconds');
  cacheTag(`post-${slug}`);
  if (!post) return notFound();
  return post;
});
