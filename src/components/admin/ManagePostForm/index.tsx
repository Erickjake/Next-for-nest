'use client';

import { useActionState, useEffect, useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { PublicPostForApiDto, PublicPostForApiSchema } from '@/src/lib/post/schemas';
import { createPostAction } from '@/src/actions/post/create-post-action';
import { updatePostAction } from '@/src/actions/post/update-post-action';
import InputText from '../../InputText';
import { MarkDownEditor } from '../../MarkDonwEditor';
import InputCheckBox from '../../InputCheckBox';
import { Button } from '../../Button';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost: PublicPostForApiDto;
};

type ManagePostFormCreateProps = {
  mode: 'create';
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  let publicPost;
  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: PublicPostForApiSchema.parse(publicPost || {}),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post atualizado com sucesso!');
    }
  }, [state.success]);

  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Post criado com sucesso!');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [created, router]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || '');

  return (
    <form action={action} className='max-w-5xl mx-auto mb-16'>
      <div className='bg-white dark:bg-zinc-900 shadow-md border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 md:p-8'>

        {/* Cabeçalho Visual */}
        <div className='mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4'>
          <h1 className='text-2xl font-bold text-zinc-800 dark:text-zinc-100'>
            {mode === 'update' ? 'Editar Postagem' : 'Criar Nova Postagem'}
          </h1>
          <p className='text-zinc-500 text-sm'>Gerencie o conteúdo e as configurações do seu post.</p>
        </div>

        <div className='flex flex-col gap-8'>

          {/* Grid para IDs e Slugs (Campos automáticos) */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-md border border-zinc-200 dark:border-zinc-800'>
            <InputText
              labelText='ID'
              name='id'
              placeholder='ID gerado automaticamente'
              type='text'
              defaultValue={formState.id}
              disabled={isPending}
              readOnly
            />

            <InputText
              labelText='Slug'
              name='slug'
              placeholder='Slug gerada automaticamente'
              type='text'
              defaultValue={formState.slug}
              disabled={isPending}
              readOnly
            />
          </div>

          {/* Campos Principais */}
          <div className='space-y-6'>
            <InputText
              labelText='Título'
              name='title'
              placeholder='Digite o título da postagem'
              type='text'
              defaultValue={formState.title}
              disabled={isPending}
            />

            <InputText
              labelText='Excerto'
              name='excerpt'
              placeholder='Breve resumo para a listagem do blog'
              type='text'
              defaultValue={formState.excerpt}
              disabled={isPending}
            />

            <MarkDownEditor
              labelText='Conteúdo'
              value={contentValue}
              setValue={setContentValue}
              textAreaName='content'
              disabled={isPending}
            />
          </div>

          {/* Seção de Mídia */}
          <div className='pt-6 border-t border-zinc-100 dark:border-zinc-800'>
            <label className='block text-sm font-medium mb-4 text-zinc-700 dark:text-zinc-300'>Imagem de Capa</label>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
              <div className='bg-zinc-50 dark:bg-zinc-950 p-4 rounded-md border border-dashed border-zinc-300 dark:border-zinc-700'>
                <ImageUploader disabled={isPending} />
              </div>
              <InputText
                labelText='URL da imagem'
                name='coverImageUrl'
                placeholder='https://exemplo.com/imagem.jpg'
                type='text'
                defaultValue={formState.coverImageUrl}
                disabled={isPending}
              />
            </div>
          </div>

          {/* Rodapé e Botões */}
          <div className='flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800'>
            <div className='w-full md:w-auto'>
              {mode === 'update' && (
                <div className='p-2 px-4 rounded-full bg-blue-50 dark:bg-blue-900/20 inline-block'>
                  <InputCheckBox
                    labelText='Publicar postagem agora?'
                    name='published'
                    type='checkbox'
                    defaultChecked={formState.published}
                    disabled={isPending}
                  />
                </div>
              )}
            </div>

            <div className='flex gap-4 w-full md:w-auto'>
              <Button
                disabled={isPending}
                type='submit'
                variant='default'
                size='md'
                className="w-full md:w-40 shadow-lg shadow-blue-500/20"
              >
                {isPending ? 'Enviando...' : 'Salvar Post'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
