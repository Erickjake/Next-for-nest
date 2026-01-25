import PostContent from "@/src/components/PostContent";
import { SinglePost } from "@/src/components/SinglePost";
import SpinLoader from "@/src/components/SpinLoader";
import { findPublicPostBySlugCached } from "@/src/lib/post/queries/public";
import { Metadata } from "next";
import { Suspense } from "react";


type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata(
  { params }: PostSlugPageProps
): Promise<Metadata> {
  const { slug } = await params;

  const post = await findPublicPostBySlugCached(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function PostSlugPage({ params }: PostSlugPageProps) {
  return (
    <Suspense fallback={<SpinLoader className="min-h-20 mb-16" />}>
      <PostContent params={params} />
    </Suspense>
  );
}
