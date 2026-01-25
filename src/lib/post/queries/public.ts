'use cache';

import notFound from '@/app/not-found';
import { PostModel } from '@/src/models/post/post-model';
import { postRepository } from '@/src/repositories/post';
import { cacheLife, cacheTag } from 'next/cache';
import { cache } from 'react';

export const findAllPublicPostsCached = cache(
  async (): Promise<PostModel[]> => {
    // ✅ PRIMEIRO define cache
    cacheLife('seconds');
    cacheTag('posts');

    // ✅ DEPOIS acessa dados
    return await postRepository.findAllPublic();
  },
);
export const findPublicPostBySlugCached = cache(async (slug: string) => {
  cacheLife('seconds');
  cacheTag(`post-${slug}`);

  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);

  if (!post) {
    throw notFound(); // 👈 IMPORTANTE
  }

  return post;
});
