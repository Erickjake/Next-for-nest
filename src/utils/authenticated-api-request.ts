import 'server-only';
import { redirect } from 'next/navigation';
import { getLoginSessionForApi } from '../lib/login/manage-login';
import { apiRequest } from './api-request';

export async function authenticatedApiRequest<T>(
  url: string,
  options?: RequestInit,
) {
  const jwtToken = await getLoginSessionForApi();

  if (!jwtToken) {
    redirect('/login');
  }

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    ...options?.headers,
  };

  return apiRequest<T>(url, {
    ...options,
    headers,
  });
}
