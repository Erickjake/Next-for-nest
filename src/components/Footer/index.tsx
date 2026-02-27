'use cache';

import { cacheLife } from 'next/cache';
import Link from 'next/link';

export async function Footer() {
  cacheLife('days');

  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-4 border-t mt-8">
      <p className="text-sm text-slate-500">
        &copy; {year} - <Link href="/">The Blog</Link>
      </p>
    </footer>
  );
}
