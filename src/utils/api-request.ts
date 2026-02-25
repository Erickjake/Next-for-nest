import 'server-only';

type ApiRequestError = {
  errors: string[];
  success: false;
  status: number;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  status: number;
};

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>;

export const API_URL = process.env.API_URL || 'http://localhost:3001';

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  const url = `${API_URL}${path}`;

  console.log('fullUrl', url);
  try {
    const response = await fetch(url, options);
    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      const errors = Array.isArray(responseData?.message)
        ? responseData.message
        : [responseData?.message || 'Erro inesperado.'];

      return {
        errors,
        success: false,
        status: response.status,
      };
    }

    return {
      data: responseData,
      success: true,
      status: response.status,
    };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      errors:
        error instanceof Error
          ? error.message.split(',')
          : ['Erro inesperado Server.'],
      success: false,
      status: 500,
    };
  }
}
