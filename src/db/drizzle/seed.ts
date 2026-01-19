import { JsonPostRepository } from '@/src/repositories/post/json-post-repository';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  try {
    await drizzleDb.delete(postsTable);
    await drizzleDb.insert(postsTable).values(posts);
  } catch (error) {
    console.error('Erro ao inserir posts na tabela posts:', error);
  }
})();
