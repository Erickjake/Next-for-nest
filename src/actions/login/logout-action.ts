'use server';

import { asyncDelay } from '@/src/utils/async-delay';

export async function logoutAction() {
  await asyncDelay(5000);
}
