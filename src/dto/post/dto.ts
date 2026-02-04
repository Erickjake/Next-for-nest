import { PostModel } from '@/src/models/post/post-model';

export type PublicPost = Omit<PostModel, 'updatedAt'>;

export const makePartialPublicPost = (
  post?: Partial<PostModel>,
): PublicPost => {
  return {
    id: post?.id || '',
    slug: post?.slug || '',
    title: post?.title || '',
    author: post?.author || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    published: post?.published || false,
    createdAt: post?.createdAt || '',
  };
};

export const makePlublicPostFromDb = (post: PostModel): PublicPost => {
  return makePartialPublicPost(post);
};
