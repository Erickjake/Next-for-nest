'use client';

import { useActionState, useState } from "react";
import { Button } from "../../Button";
import InputCheckBox from "../../InputCheckBox";
import InputText from "../../InputText";
import { MarkDownEditor } from "../../MarkDonwEditor";
import { ImageUploader } from "../ImageUploader";
import { makePartialPublicPost, PublicPost } from "@/src/dto/post/dto";
import { createPostAction } from "@/src/actions/post/create-post-action";

type ManagePostFormProps = {
  postPublic?: PublicPost;
}
export function ManagePostForm({ postPublic }: ManagePostFormProps) {

  const initialState = {
    formState: makePartialPublicPost(postPublic),
    erros: [],
  }
  const [state, action, isPending] = useActionState(createPostAction, initialState)

  const { formState } = state;
  const [content, setContent] = useState(postPublic?.content || '');


  return (
    <form action={action} className="flex gap-6 flex-col ">
      <div className=" flex gap-6 flex-col ">
        <InputText labelText="Slug" name="slug" type="text" readOnly defaultValue={formState.slug || ''} placeholder="Gerado Automatico" />
        <InputText labelText="Title" name="title" type="text" defaultValue={formState.title || ''} placeholder="Título do Post" />
        <InputText labelText="Autor" name="author" type="text" defaultValue={formState.author || ''} placeholder="Nome do Autor" />
        <InputText labelText="Excerto" name="excerpt" type="text" defaultValue={formState.excerpt || ''} placeholder="Digite o Resumo" />
        <MarkDownEditor labelText="Conteúdo" value={content} setValue={setContent} textAreaName="content" />
        <ImageUploader />
        <InputText labelText="URL de imagem de capa" name="coverImageUrl" type="text" defaultValue={formState.coverImageUrl || ''} placeholder="Digite a URL da Imagem de Capa" />
        <InputCheckBox labelText="Publicar" type="checkbox" name="published" defaultChecked={formState.published || false} />
        <Button variant="default" size={"md"} type="submit">Create Post</Button>
      </div>
    </form>
  )
}

