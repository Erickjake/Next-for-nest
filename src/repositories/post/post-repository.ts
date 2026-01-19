import { PostModel } from '@/src/models/post/post-model';

export interface PostRepository {
  findAllPublic(): Promise<PostModel[]>;
  findAll(): Promise<PostModel[]>;
  findByID(id: string): Promise<PostModel | null>;
  findBySlug(slug: string): Promise<PostModel | null>;
}
