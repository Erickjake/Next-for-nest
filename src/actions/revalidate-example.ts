'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateExampleAction(formatData: FormData) {
  // Revalida todas as páginas que usam a tag 'posts'
  const path = formatData.get('path') || '';
  console.log(`Revalidating path: ${path}`);

  revalidateTag('posts', 'max');
  revalidateTag(`post-${path}`, 'max');
}
