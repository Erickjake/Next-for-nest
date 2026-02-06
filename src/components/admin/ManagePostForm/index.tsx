'use client';

import { useActionState, useEffect, useState } from "react";
import { Button } from "../../Button";
import InputCheckBox from "../../InputCheckBox";
import InputText from "../../InputText";
import { MarkDownEditor } from "../../MarkDonwEditor";
import { ImageUploader } from "../ImageUploader";
import { makePartialPublicPost, PublicPost } from "@/src/dto/post/dto";
import { createPostAction } from "@/src/actions/post/create-post-action";
import { toast } from "react-toastify";
import { updatePostAction } from "@/src/actions/post/update-post-action";
import { useRouter, useSearchParams } from "next/navigation";

type ManagePostFormUpdateProps = {
  mode: "update";
  publicPost?: PublicPost;
}
type ManagePostFormCreateProps = {
  mode: "create";
}
type ManagePostFormProps = ManagePostFormUpdateProps | ManagePostFormCreateProps
export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props
  const searchParams = useSearchParams()
  const created = searchParams.get('created')
  const router = useRouter()


  let publicPost

  if (mode === "update") {
    publicPost = props.publicPost
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  }
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  }
  const [state, action, isPending] = useActionState(actionsMap[mode], initialState)

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((errors) => toast.error(errors))
    }
  }, [state.errors])

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post salvo com sucesso');
    }
  }, [state.success])

  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Post salvo com sucesso');
      const url = new URL(window.location.href)
      url.searchParams.delete('created')
      router.replace(url.toString())
    }
  }, [created, router])


  const { formState } = state;
  const [content, setContent] = useState(publicPost?.content || '');


  return (
    <form action={action} className="flex gap-6 flex-col ">
      <div className=" flex gap-6 flex-col ">
        <InputText disabled={isPending} labelText="id" name="id" type="text" readOnly defaultValue={formState.id || ''} placeholder="Gerado Automatico" />
        <InputText disabled={isPending} labelText="Slug" name="slug" type="text" readOnly defaultValue={formState.slug || ''} placeholder="Gerado Automatico" />
        <InputText disabled={isPending} labelText="Title" name="title" type="text" defaultValue={formState.title || ''} placeholder="Título do Post" />
        <InputText disabled={isPending} labelText="Autor" name="author" type="text" defaultValue={formState.author || ''} placeholder="Nome do Autor" />
        <InputText disabled={isPending} labelText="Excerto" name="excerpt" type="text" defaultValue={formState.excerpt || ''} placeholder="Digite o Resumo" />
        <MarkDownEditor disabled={isPending} labelText="Conteúdo" value={content} setValue={setContent} textAreaName="content" />
        <ImageUploader disabled={isPending} />
        <InputText disabled={isPending} labelText="URL de imagem de capa" name="coverImageUrl" type="text" defaultValue={formState.coverImageUrl || ''} placeholder="Digite a URL da Imagem de Capa" />
        <InputCheckBox disabled={isPending} labelText="Publicar" type="checkbox" name="published" defaultChecked={formState.published || false} />
        <Button disabled={isPending} variant="default" size={"md"} type="submit">Create Post</Button>
      </div>
    </form>
  )
}

