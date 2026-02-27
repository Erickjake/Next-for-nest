import { SinglePost } from '@/src/components/SinglePost';
import SpinLoader from '@/src/components/SpinLoader';
import { findPublicPostBySlugFromApiCached } from '@/src/lib/post/queries/public';
import { Metadata } from 'next';
import { Suspense } from 'react';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

// 1. A geração de metadados continua igual (aqui o await é permitido e necessário)
export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postRes = await findPublicPostBySlugFromApiCached(slug);

  if (!postRes.success) {
    return {};
  }

  const post = postRes.data;

  return {
    title: post.title,
    description: post.excerpt,
  };
}

// 2. NOVO: Criámos um componente intermediário para resolver a Promessa (o await)
async function PostWrapper({ params }: { params: Promise<{ slug: string }> }) {
  // O await acontece aqui, já debaixo da proteção do Suspense!
  const { slug } = await params;

  // Agora passamos o texto limpo para o teu SinglePost
  return <SinglePost slug={slug} />;
}

// 3. CORRIGIDO: A página principal já não é 'async' e não bloqueia a renderização
export default function PostSlugPage({ params }: PostSlugPageProps) {
  return (
    // O Suspense mostra logo o Loader enquanto o PostWrapper descobre o slug e carrega o SinglePost
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      {/* Passamos a Promessa inteira dos params para o Wrapper */}
      <PostWrapper params={params} />
    </Suspense>
  );
}
