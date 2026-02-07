import { PostModel } from '@/src/models/post/post-model';
import { PostRepository } from './post-repository';
import { drizzleDb } from '@/src/db/drizzle';
import { asyncDelay } from '@/src/utils/async-delay';
import { postsTable } from '@/src/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

const simulateWaitMs = Number(process.env.SIMULATED_DELAY_MS || 0);

export class DrizzlePostRepository implements PostRepository {
  async delete(id: string): Promise<void> {
    await asyncDelay(simulateWaitMs, true);
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (!post) {
      throw new Error(`Post with ID ${id} Não encontrado.`);
    }
    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id)).returning();
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (!oldPost) {
      throw new Error(`Post with ID ${id} Não encontrado.`);
    }
    const updatedAt = new Date().toISOString();
    const postData = {
      author: newPostData.author,
      title: newPostData.title,
      content: newPostData.content,
      published: newPostData.published,
      excerpt: newPostData.excerpt,
      coverImageUrl: newPostData.coverImageUrl,
      updatedAt,
    };
    await drizzleDb
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id))
      .returning();

    return {
      ...oldPost,
      ...postData,
    };
  }
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(simulateWaitMs, true);
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });
    return posts;
  }
  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(simulateWaitMs, true);

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
    await asyncDelay(simulateWaitMs, true);

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    return posts;
  }

  async findByID(id: string): Promise<PostModel> {
    await asyncDelay(simulateWaitMs, true);

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (!post) {
      throw new Error(`Post with ID ${id} Não encontrado.`);
    }
    return post as PostModel;
  }
  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, or }) =>
        or(eq(posts.id, post.id), eq(posts.id, post.id)),
      columns: { id: true },
    });
    if (postExists) {
      throw new Error(`Post with ID ${post.id} já existe.`);
    }
    await asyncDelay(simulateWaitMs, true);
    await drizzleDb.insert(postsTable).values(post);
    return post;
  }
}
