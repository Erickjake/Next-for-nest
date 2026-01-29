'use client'

import { ImageUpIcon } from "lucide-react"
import { Button } from "../../Button"
import { useRef } from "react"
import { IMAGE_UPLOAD_ACCEPTED_FILE_TYPES, IMAGE_UPLOAD_MAX_FILE_SIZE } from "@/src/lib/post/constants";
import { toast } from "react-toastify";

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleFileChange() {
    if (!fileInputRef.current) return;
    const file = fileInputRef.current
    const fileImage = file?.files?.[0];
    if (!fileImage) return;
    if (!IMAGE_UPLOAD_ACCEPTED_FILE_TYPES.includes(fileImage.type)) {
      toast.error(`tipo ${fileImage.type} é inválido. Por favor, envie um arquivo de imagem.`);
      fileInputRef.current.value = '';
      return;
    }
    if (fileImage.size > IMAGE_UPLOAD_MAX_FILE_SIZE) {
      toast.error(`Por favor, envie um arquivo de imagem menor que ${IMAGE_UPLOAD_MAX_FILE_SIZE / 1024}KB`);

      fileInputRef.current.value = '';
      return;
    }
    // TODO: Enviar o arquivo para o servidor
    const formData = new FormData();
    formData.append('image', fileImage);
    console.log(formData.get('image'));
    fileInputRef.current.value = '';
  }
  return (
    <div className="flex flex-col gap-2 py-4">
      <Button variant="ghost" size="md" type="button" className="self-start" onClick={handleChooseFile}>
        <ImageUpIcon />
        Upload Image
      </Button>
      <input ref={fileInputRef} type="file" accept="image/*" id="image-upload" className="hidden" title="Upload an image file" onChange={handleFileChange} />
    </div>
  )
}

