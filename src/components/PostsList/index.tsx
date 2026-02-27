import { findAllPublicPostsFromApiCached } from '@/src/lib/post/queries/public';
import PostCoverImage from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

export async function PostsList() {
  const postsRes = await findAllPublicPostsFromApiCached();

  // Se falhar ou estiver vazio, podemos retornar um aviso amigável em vez de null
  if (!postsRes.success || postsRes.data.length <= 1) {
    return (
      <div className="py-20 text-center text-gray-500">
        <p>Nenhum post adicional encontrado.</p>
      </div>
    );
  }

  const posts = postsRes.data.slice(1);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const postLink = `/post/${post.slug}`;

          return (
            <article
              key={post.id}
              className="group flex flex-col space-y-4 transition-all duration-300"
            >
              {/* Container da Imagem com overflow-hidden para o efeito de zoom */}
              <div className="overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                <div className="transition-transform duration-500 group-hover:scale-105">
                  <PostCoverImage
                    linkProps={{
                      href: postLink,
                      className: "block"
                    }}
                    imageProps={{
                      width: 1200,
                      height: 720,
                      src: post.coverImageUrl,
                      alt: post.title,
                      className: "aspect-video object-cover"
                    }}
                  />
                </div>
              </div>

              {/* Conteúdo do Texto */}
              <div className="flex flex-1 flex-col px-1">
                <PostSummary
                  postLink={postLink}
                  postHeading="h2" // h3 costuma ser melhor para listas de grid em termos de SEO/Hierarquia
                  createdAt={post.createdAt}
                  excerpt={post.excerpt}
                  title={post.title}
                />

                {/* Opcional: Link "Ler mais" que aparece ou muda de cor no hover */}
                <div className="mt-4">
                  <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-500 transition-colors">
                    Ler artigo completo →
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
