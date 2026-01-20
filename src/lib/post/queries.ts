import { PostModel } from '@/src/models/post/post-model'; // Confirme o caminho
import { postRepository } from '@/src/repositories/post';
import { notFound } from 'next/navigation';
import { cache } from 'react';

// A tipagem : Promise<PostModel[]> deve ficar DEPOIS dos parênteses do async
export const findAllPublicPostsCached = cache(
  async (): Promise<PostModel[]> => {
    // Remova o ": Promise<...>" desta linha abaixo
    const posts = await postRepository.findAllPublic();
    return posts;
  },
);
export const findPostBySlugCached = cache(async (slug: string) => {
  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);
  if (!post) return notFound();
  return post;
});
export const findPostByIdCached = cache(
  async (id: string) => await postRepository.findBySlugPublic(id),
);
