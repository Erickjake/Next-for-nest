import { findAllPostAdmin } from "@/src/lib/post/queries/admin";

export default async function PostListAdminPage() {
  const posts = await findAllPostAdmin();
  return (
    <div className="py-16 text-xl">
      {posts.map((post) => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}
