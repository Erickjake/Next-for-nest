import { SinglePost } from "../SinglePost";

async function PostContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <SinglePost slug={slug} />;
}

export default PostContent;
