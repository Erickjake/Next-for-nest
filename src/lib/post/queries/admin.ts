import { postRepository } from '@/src/repositories/post';

export const findPostByIdAdmin = async (id: string) =>
  await postRepository.findBySlugPublic(id);

export const findAllPostAdmin = async () => await postRepository.findAll();
