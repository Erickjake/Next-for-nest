import { findAllPostAdmin } from "@/src/lib/post/queries/admin";
import { cn } from "@/src/lib/utils";
import Link from "next/link";
import DeletePostButton from "../admin/DeletePostButton";

export default async function PostListAdminPage() {
  const posts = await findAllPostAdmin();
  return (
    <div className="mb-16">
      {posts.map((post) =>
        <div key={post.id} className={cn('py-2', 'px-2', !post.published && 'opacity-50', 'border-b', 'border-gray-200', 'flex', 'items-center', 'justify-between', 'cursor-pointer', 'hover:opacity-75', 'transition-colors')}>
          <Link href={`/admin/post/${post.id}`} className="">{post.title || 'Untitled Post'}</Link>
          {!post.published && <span className="ml-2 text-sm text-purple-500 italic">(Não publicado)</span>}
          <DeletePostButton id={post.id} title={post.title} />
        </div>)}
      <div className={cn('fixed', 'inset-0', 'bg-black/50 backdrop-blur-xs:', 'flex', 'items-center', 'justify-center',
        'z-50')}>
        <div className={cn('bg-slate-600', 'p-6', 'rounded-lg', 'max-w-md', 'mx-6', 'flex', 'flex-col', 'gap-6', 'text-white text-center', 'shadow-lg shadow-slate-300/30')}>
          <h3 className="text-xl font-extrabold text-slate-900">Criar novo post</h3>
          <p>Adicione um novo post ao blog</p>
          <div className="flex items-center justify-around">
            <button className={cn('bg-slate-800', 'px-4', 'py-2', 'rounded-md', 'hover:bg-slate-700', 'transition-colors', 'cursor-pointer')} autoFocus>Cancelar</button>
            <button className={cn('bg-red-500', 'px-4', 'py-2', 'rounded-md', 'hover:bg-red-700', 'transition-colors', 'cursor-pointer')} autoFocus>Ok</button>
          </div>
        </div>
      </div>
    </div>
  );
}
