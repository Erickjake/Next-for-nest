import { verifyJwt, verifyLoginSession } from '@/src/lib/login/manage-login';
import clsx from 'clsx';
import Link from 'next/link';
export async function Header() {
  // Chamamos sua função diretamente no servidor
  const isLoggedIn = await verifyJwt();

  return (
    <header className="border-b border-gray-100 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-7 px-4 sm:px-6 lg:px-8">
        <h1 className={clsx(
          'text-4xl font-black tracking-tight sm:text-5xl md:text-6xl',
          'bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent'
        )}>
          <Link href="/" className="hover:opacity-90 transition-opacity duration-300">
            The Blog
          </Link>
        </h1>

        <nav className="mt-4 sm:mt-0 flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">
            Home
          </Link>

          <Link
            href={isLoggedIn ? "/admin/post" : "/login"}
            className={clsx(
              'px-5 py-2 rounded-full text-sm font-semibold transition-all',
              'bg-gray-900 text-white hover:bg-gray-700',
              'dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-md hover:shadow-lg'
            )}
          >
            {isLoggedIn ? 'Post' : 'Entrar'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
