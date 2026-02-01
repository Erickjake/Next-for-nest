'use client';

import { useActionState, useState } from "react";
import { Button } from "../../Button";
import InputCheckBox from "../../InputCheckBox";
import InputText from "../../InputText";
import { MarkDownEditor } from "../../MarkDonwEditor";
import { ImageUploader } from "../ImageUploader";
import { PublicPostModel } from "@/src/dto/post/dto";
import { createPostAction } from "@/src/actions/post/create-post-action";

type ManagePostFormProps = {
  postPublic?: PublicPostModel;
}
export function ManagePostForm({ postPublic }: ManagePostFormProps) {
  const [content, setContent] = useState(postPublic?.content || '');

  const initialState = {
    numero: 0,
  }
  const [state, action, isPending] = useActionState(createPostAction, initialState)

  return (
    <form action={action} className="flex gap-6 flex-col ">
      <div className=" flex gap-6 flex-col ">
        <InputText labelText="Slug" name="slug" type="text" readOnly defaultValue={postPublic?.slug || ''} placeholder="Gerado Automatico" />
        <InputText labelText="Title" name="title" type="text" defaultValue={postPublic?.title || ''} placeholder="Título do Post" />
        <InputText labelText="Autor" name="author" type="text" defaultValue={postPublic?.author || ''} placeholder="Nome do Autor" />
        <InputText labelText="Excerto" name="excerpt" type="text" defaultValue={postPublic?.excerpt || ''} placeholder="Digite o Resumo" />
        <MarkDownEditor labelText="Conteúdo" value={content} setValue={setContent} textAreaName="content" />
        <ImageUploader />
        <InputText labelText="URL de imagem de capa" name="coverImageUrl" type="text" defaultValue={postPublic?.coverImageUrl || ''} placeholder="Digite a URL da Imagem de Capa" />
        <InputCheckBox labelText="Publicar" type="checkbox" name="published" defaultChecked={postPublic?.published || false} />
        <Button variant="default" size={"md"} type="submit">Create Post</Button>
      </div>
    </form>
  )
}

