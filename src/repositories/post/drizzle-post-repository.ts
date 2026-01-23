import { PostModel } from '@/src/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/src/db/drizzle';
import { logColor } from '@/src/utils/log-color';
import { asyncDelay } from '@/src/utils/async-delay';
import { SIMULATED_DELAY_MS } from '@/src/lib/post/constants';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATED_DELAY_MS, true);
    logColor(
      'findAllPublic: Executando consulta de posts públicos',
      Date.now().toString(),
    );
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });
    return posts;
  }
  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATED_DELAY_MS, true);

    logColor(
      'findBySlugPublic: Executando consulta de post público por slug',
      Date.now(),
    );
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.slug, slug), eq(posts.published, true)),
    });
    if (!post) {
      throw new Error(`Post with slug ${slug} Não encontrado.`);
    }

    return post as PostModel;
  }
  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATED_DELAY_MS, true);

    logColor(
      'findAll: Executando consulta de todos os posts',
      Date.now().toString(),
    );
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    return posts;
  }

  async findByID(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATED_DELAY_MS, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (!post) {
      throw new Error(`Post with ID ${id} Não encontrado.`);
    }
    return post as PostModel;
  }
}

// (async () => {
//   const repo = new DrizzlePostRepository();
//   const posts = await repo.findAll();
//   posts.forEach(posts => console.log(posts.slug, posts.published));
// })();
