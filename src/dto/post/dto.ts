import { PostModel } from '@/src/models/post/post-model';

export type PublicPostModel = Omit<PostModel, 'updatedAt'>;

export const makePlublicPost = (post: PostModel): PublicPostModel => {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    author: post.author,
    excerpt: post.excerpt,
    content: post.content,
    coverImageUrl: post.coverImageUrl,
    published: post.published,
    createdAt: post.createdAt,
  };
};
