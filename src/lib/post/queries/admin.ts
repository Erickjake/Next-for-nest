import { postRepository } from '@/src/repositories/post';

export async function findPostByIdAdmin(id: string) {
  // CORREÇÃO: Use o método que busca pela chave primária (ID)
  return await postRepository.findByID(id);
}
export async function findAllPostAdmin() {
  return await postRepository.findAll();
}
