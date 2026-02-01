'use client'

import Image from "next/image"
import { ImageUpIcon } from "lucide-react"
import { Button } from "../../Button"
import { useRef, useState, useTransition } from "react"
import { IMAGE_UPLOAD_ACCEPTED_FILE_TYPES, IMAGE_UPLOAD_MAX_FILE_SIZE } from "@/src/lib/post/constants";
import { toast } from "react-toastify";
import { uploadImageAction } from "@/src/actions/post/upload-image-action";

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition()
  const [imgUrl, setImgUrl] = useState('');
  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleFileChange() {
    toast.dismiss();
    if (!fileInputRef.current) {
      setImgUrl('')
      return
    };
    const fileInput = fileInputRef.current
    const file = fileInput?.files?.[0];
    if (!file) { setImgUrl(''); return };
    if (!IMAGE_UPLOAD_ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error(`tipo ${file.type} é inválido. Por favor, envie um arquivo de imagem.`);
      fileInputRef.current.value = '';
      {
        setImgUrl('')
        return
      };
    }
    if (file.size > IMAGE_UPLOAD_MAX_FILE_SIZE) {
      toast.error(`Por favor, envie um arquivo de imagem menor que ${IMAGE_UPLOAD_MAX_FILE_SIZE / 1024}KB`);

      fileInputRef.current.value = '';
      setImgUrl('')
      return;
    }

    const formData = new FormData();
    formData.append('file', file);



    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setImgUrl('')
        return
      }
      setImgUrl(result.url);
      toast.success('Imagem enviada com sucesso');
    })
    fileInputRef.current.value = '';
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      <Button variant="ghost" size="md" type="button" className="self-start" onClick={handleChooseFile} disabled={isUploading}>
        <ImageUpIcon />
        Upload Image
      </Button>
      {!!imgUrl && (
        <div>
          <p>
            <b>URL:</b> {imgUrl}
          </p>
          <Image src={imgUrl} alt="uploaded" className="w-24 h-24 rounded-md" />
        </div>
      )}
      <input ref={fileInputRef} type="file" accept="image/*" id="image-upload" className="hidden" title="Upload an image file" onChange={handleFileChange} />
    </div>
  )
}

