import { PostModel } from '@/src/models/post/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'path';
import { promises as fs } from 'fs';

const simulateWaitMs = Number(process.env.SIMULATED_DELAY_MS || 0);
const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);

export class JsonPostRepository implements PostRepository {
  private async simulateDelay() {
    if (simulateWaitMs <= 0) return;
    return new Promise(resolve => setTimeout(resolve, simulateWaitMs));
  }
  // Adicionei o tipo de retorno explicitamente
  private async readFromDisk(): Promise<PostModel[]> {
    try {
      const jsonContent = await fs.readFile(JSON_POSTS_FILE_PATH, 'utf-8');
      const parsedJson = JSON.parse(jsonContent);
      const { posts } = parsedJson;

      // IMPORTANTE: Você precisa retornar o valor!
      return posts as PostModel[];
    } catch (error) {
      console.error('Erro ao ler o arquivo JSON:', error);
      return []; // Retorna array vazio em caso de erro para evitar quebra do sistema
    }
  }

  async findAllPublic(): Promise<PostModel[]> {
    await this.simulateDelay();
    // Agora o findAll recebe e repassa os dados do disco
    const posts = await this.readFromDisk();
    return posts.filter(post => post.published === true);
  }
  async findAll(): Promise<PostModel[]> {
    await this.simulateDelay();
    // Agora o findAll recebe e repassa os dados do disco
    const posts = await this.readFromDisk();
    return posts;
  }
  async findByID(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.id === id);
    if (!post) {
      throw new Error(`Post with ID ${id} Não encontrado.`);
    }
    return post;
  }
  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find(post => post.slug === slug);
    if (!post) {
      throw new Error(`Post with slug ${slug} Não encontrado.`);
    }
    return post;
  }
  async create(post: PostModel): Promise<PostModel> {
    await this.simulateDelay();
    const posts = await this.readFromDisk();
    posts.push(post);
    await fs.writeFile(
      JSON_POSTS_FILE_PATH,
      JSON.stringify({ posts }, null, 2),
    );
    return post;
  }
  async delete(id: string): Promise<void> {
    await this.simulateDelay();
    const posts = await this.readFromDisk();
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new Error(`Post with ID ${id} Não encontrado.`);
    }
    posts.splice(postIndex, 1);
    await fs.writeFile(
      JSON_POSTS_FILE_PATH,
      JSON.stringify({ posts }, null, 2),
    );
  }
  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    await this.simulateDelay();
    const posts = await this.readFromDisk();
    const postIndex = posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new Error(`Post with ID ${id} Não encontrado.`);
    }
    posts[postIndex] = {
      ...posts[postIndex],
      ...newPostData,
      updatedAt: new Date().toISOString(),
    };
    await fs.writeFile(
      JSON_POSTS_FILE_PATH,
      JSON.stringify({ posts }, null, 2),
    );
    return posts[postIndex];
  }
  private async writeToDisk(posts: PostModel[]): Promise<void> {
    await fs.writeFile(
      JSON_POSTS_FILE_PATH,
      JSON.stringify({ posts }, null, 2),
    );
  }
}
