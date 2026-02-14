'use client'

import Image from "next/image"
import { ImageUpIcon } from "lucide-react"
import { Button } from "../../Button"
import { useRef, useState, useTransition } from "react"
import { IMAGE_UPLOAD_ACCEPTED_FILE_TYPES } from "@/src/lib/post/constants";
import { toast } from "react-toastify";
import { uploadImageAction } from "@/src/actions/post/upload-image-action";

// Definimos um fallback seguro de 2MB (em bytes) caso a .env falhe
const FALLBACK_MAX_SIZE_IN_BYTES = 2 * 1024 * 1024;
const envMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_FILE_SIZE);
const uploadMaxSize = envMaxSize > 0 ? envMaxSize : FALLBACK_MAX_SIZE_IN_BYTES;

type ImageProps = {
  disabled?: boolean
}

export function ImageUploader({ disabled = false }: ImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleFileChange() {
    toast.dismiss();

    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    // Validação de Tipo (chaves extras removidas)
    if (!IMAGE_UPLOAD_ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error(`O formato ${file.type} é inválido. Por favor, envie um arquivo de imagem.`);
      fileInputRef.current.value = '';
      setImgUrl('');
      return;
    }

    // Validação de Tamanho (agora validando Bytes e exibindo em MB)
    if (file.size > uploadMaxSize) {
      const maxSizeInMB = (uploadMaxSize / (1024 * 1024)).toFixed(1);
      toast.error(`Por favor, envie um arquivo de imagem menor que ${maxSizeInMB}MB.`);
      fileInputRef.current.value = '';
      setImgUrl('');
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
        setImgUrl('');
        return;
      }

      setImgUrl(result.url);
      toast.success('Imagem enviada com sucesso!');
    });

    // Limpa o input para permitir selecionar o mesmo arquivo novamente se necessário
    fileInputRef.current.value = '';
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      <Button
        variant="ghost"
        size="md"
        type="button"
        className="self-start"
        onClick={handleChooseFile}
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Upload Image
      </Button>

      {!!imgUrl && (
        <div>
          <p>
            <b>URL:</b> {imgUrl}
          </p>
          <Image
            src={imgUrl}
            alt="uploaded preview"
            width={96}
            height={96}
            className="w-24 h-24 rounded-md object-cover"
          />
        </div>
      )}

      <input
        disabled={isUploading || disabled}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        id="image-upload"
        className="hidden"
        title="Upload an image file"
        onChange={handleFileChange}
      />
    </div>
  )
}
