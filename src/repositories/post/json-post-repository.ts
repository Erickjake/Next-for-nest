import { PostModel } from '@/src/models/post/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'path';
import { promises as fs } from 'fs';

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);
const SIMULATED_DELAY_MS = 0;
export class JsonPostRepository implements PostRepository {
  private async simulateDelay() {
    if (SIMULATED_DELAY_MS <= 0) return;
    return new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY_MS));
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

  async findAll(): Promise<PostModel[]> {
    await this.simulateDelay();
    // Agora o findAll recebe e repassa os dados do disco
    const posts = await this.readFromDisk();
    return posts;
  }
  async findByID(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const post = posts.find(post => post.id === id);
    if (!post) {
      throw new Error(`Post with ID ${id} Não encontrado.`);
    }
    return post;
  }
}
