'use server';

import { asyncDelay } from '@/src/utils/async-delay';
import { logColor } from '@/src/utils/log-color';

export async function deletePostAction(id: string) {
  await asyncDelay(2000);
  logColor('' + id, 'red');
  return id;
}
