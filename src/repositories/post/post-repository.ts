import { PostModel } from '@/src/models/post/post-model';

export interface PostRepository {
  findAll(): Promise<PostModel[]>;
  findByID(id: string): Promise<PostModel | null>;
}
