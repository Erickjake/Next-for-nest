import clsx from 'clsx';
import Link from 'next/link';
import ErrorMessage from '../../ErrorMessage';
import { findAllPostFromApiAdmin } from '@/src/lib/post/queries/admin';
import DeletePostButton from '../DeletePostButton';

export default async function PostsListAdmin() {
  const postsRes = await findAllPostFromApiAdmin();

  if (!postsRes.success) {
    console.log(postsRes.errors);
    return (
      <ErrorMessage
        contentTitle='Ei 😅'
        content='Tente fazer login novamente'
      />
    );
  }

  const posts = postsRes.data;
  if (posts.length <= 0) {
    return (
      <ErrorMessage contentTitle='Ei 😅' content='Bora criar algum post??' />
    );
  }

  return (
    <div className='mb-16 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm'>
      <div className='divide-y divide-zinc-100 dark:divide-zinc-800'>
        {posts.map(post => {
          return (
            <div
              key={post.id}
              className={clsx(
                'group flex items-center justify-between p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
                !post.published && 'bg-zinc-50/50 dark:bg-zinc-950/30'
              )}
            >
              <div className='flex flex-col gap-1 min-w-0 flex-1'>
                <Link
                  href={`/admin/post/${post.id}`}
                  className='text-sm font-semibold text-zinc-800 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate'
                >
                  {post.title}
                </Link>

                <div className='flex items-center gap-3'>
                  <span className='text-[10px] uppercase tracking-wider font-medium text-zinc-400'>
                    ID: {post.id.substring(0, 8)}...
                  </span>

                  {!post.published && (
                    <span className='inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50'>
                      Rascunho
                    </span>
                  )}
                  {post.published && (
                    <span className='inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50'>
                      Publicado
                    </span>
                  )}
                </div>
              </div>

              <div className='flex items-center ml-4 opacity-80 group-hover:opacity-100 transition-opacity'>
                <DeletePostButton id={post.id} title={post.title} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
