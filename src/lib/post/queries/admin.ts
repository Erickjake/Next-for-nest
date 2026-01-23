import { postRepository } from '@/src/repositories/post';
import { cache } from 'react';

export const findPostByIdAdmin = cache(
  async (id: string) => await postRepository.findBySlugPublic(id),
);

export const findAllPostAdmin = cache(
  async () => await postRepository.findAll(),
);
