'use server';

import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageAction = {
  url: string;
  error: string;
};

const uploadDiretory = process.env.IMAGE_UPLOAD_DIRECTORY;
const serverUrl = process.env.IMAGE_SERVER_URL;

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageAction> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });
  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ error: 'Nenhum arquivo foi enviado' });
  }

  if (file.size > 1024 * 1024)
    return makeResult({ error: 'Arquivo muito grande' });

  if (!file.type.startsWith('image/'))
    return makeResult({ error: 'Arquivo inválido' });

  const imageExtension = extname(file.name);
  const imageName = `${Date.now()}${imageExtension}`;

  const uploadPath = resolve(
    process.cwd(),
    'public',
    uploadDiretory || 'uploads',
  );
  await mkdir(uploadPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileArrayBuffer);

  const filePath = resolve(uploadPath, imageName);
  await writeFile(filePath, fileBuffer);

  const url = `${serverUrl}/${imageName}`;

  return makeResult({ url });
}
