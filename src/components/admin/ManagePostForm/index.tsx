'use client';

import { useState } from "react";
import { Button } from "../../Button";
import InputCheckBox from "../../InputCheckBox";
import InputText from "../../InputText";
import { MarkDownEditor } from "../../MarkDonwEditor";
import { ImageUploader } from "../ImageUploader";

export function ManagePostForm() {
  const [content, setContent] = useState('');

  return (
    <form className="flex gap-6 flex-col ">
      <div className=" flex gap-6 flex-col ">
        <InputText labelText="Nome" name="title" />
        <InputText labelText="Email" name="email" />
        <ImageUploader />
        <MarkDownEditor labelText="Conteúdo" value={content} setValue={setContent} textAreaName="content" />
        <InputCheckBox labelText="Aceito os termos e condições" />
        <InputCheckBox labelText="Publicar" />
        <Button variant="default" size={"md"} type="submit">Create Post</Button>
      </div>
    </form>
  )
}

