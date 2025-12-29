import { postRepository } from "@/src/repositories/post";

export async function PostsList() {
  const posts = await postRepository.findAll();
  return (
    <div>
      {posts.map((p) => (
        <div key={p.id} className="border-b py-4">
          <h2 className="text-2xl font-semibold">{p.title}</h2>
          <p className="text-gray-600">{p.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
