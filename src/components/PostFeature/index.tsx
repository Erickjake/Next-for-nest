import PostCoverImage from "../PostCoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPosts } from "@/src/lib/post/queries";

export async function PostFeature() {
  // PONTO DE ATENÇÃO: O ideal seria ter uma função findLatestPost()
  // que usa "LIMIT 1" no banco de dados para não trafegar dados desnecessários.
  const posts = await findAllPublicPosts();
  const post = posts[0];

  // 1. Guard Clause: Se não houver posts, não renderiza nada (ou renderiza um placeholder)
  // Isso evita o crash da aplicação.
  if (!post) {
    return null;
    // Ou: return <p className="text-center py-10">Nenhum post em destaque no momento.</p>;
  }

  const postLink = `/posts/${post.slug}`;

  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      <PostCoverImage
        imageProps={{
          src: post.coverImageUrl,
          alt: post.title,
          width: 1200,
          height: 720,
          priority: true // Ótimo uso de priority para LCP (Largest Contentful Paint)
        }}
        linkProps={{ href: postLink }}
      />
      <PostSummary
        postHeading="h1"
        postLink={postLink}
        createdAt={post.createdAt}
        title={post.title}
        excerpt={post.excerpt}
      />
    </section>
  );
}
