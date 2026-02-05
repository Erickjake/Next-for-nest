import { PostModel } from '@/src/models/post/post-model';

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>;
  findBySlugPublic(slug: string): Promise<PostModel | null>;
  findAll(): Promise<PostModel[]>;
  findByID(id: string): Promise<PostModel | null>;
  // Mutation
  create(post: PostModel): Promise<PostModel>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel>;
}
