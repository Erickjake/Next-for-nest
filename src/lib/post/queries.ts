import { PostModel } from '@/src/models/post/post-model'; // Confirme o caminho
import { postRepository } from '@/src/repositories/post';
import { cache } from 'react';

// A tipagem : Promise<PostModel[]> deve ficar DEPOIS dos parênteses do async
export const findAllPublicPosts = cache(async (): Promise<PostModel[]> => {
  // Remova o ": Promise<...>" desta linha abaixo
  const posts = await postRepository.findAllPublic();
  return posts;
});
