import { findAllPostAdmin } from "@/src/lib/post/queries/admin";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import { connection } from "next/server";
import ErrorMessage from "../../ErrorMessage";
import DeletePostButton from "../DeletePostButton";

export default async function PostListAdminPage() {
  await connection()
  const posts = await findAllPostAdmin();
  if (posts.length <= 0) return <ErrorMessage contentTitle="Ei!😅" content="Bora adicionar um post?" />; // Sem posts adicionais para listar
  return (
    <div className="mb-16">
      {posts.map((post) =>
        <div key={post.id} className={cn('py-2', 'px-2', !post.published && 'opacity-50', 'border-b', 'border-gray-200', 'flex', 'items-center', 'justify-between', 'cursor-pointer', 'hover:opacity-75', 'transition-colors')}>
          <Link href={`/admin/post/${post.id}`} className="">{post.title || 'Untitled Post'}</Link>
          {!post.published && <span className="ml-2 text-sm text-purple-500 italic">(Não publicado)</span>}
          <DeletePostButton id={post.id} title={post.title} />
        </div>)}

    </div>
  );
}
