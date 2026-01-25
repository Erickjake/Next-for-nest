'use client'
import { deletePostAction } from "@/src/actions/post/delete-post-action";
import { cn } from "@/src/lib/utils";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import Dialog from "../../Dialog";
import { toast } from "react-toastify";

type DeletePostButtonProps = {
  id: string;
  title: string;
};
export default function DeletePostButton({ id, title: postTitle }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);
  function handleClick() {
    setShowDialog(true);

  }
  function handleConfirm() {
    toast.dismiss();
    startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);
      if (result.error) {
        toast.error(`Erro ao excluir o post: ${result.error}`);
        return;
      }
      toast.success('Post excluído com sucesso!');
    }
    );
  }
  return (
    <>
      <button disabled={isPending} onClick={handleClick} title="Excluir post" aria-label={`Excluir post ${postTitle || 'sem título'}`} className={cn('text-red-500', 'hover:text-red-700', 'ml-4', 'transition-colors', 'cursor-pointer', '[&_svg]:w-4', '[&_svg]:h-4', 'focus:outline-none', 'hover:scale-120', 'transform', 'duration-150', 'disabled:text-slate-600', 'disabled:cursor-not-allowed', 'disabled:hover:scale-100')}>
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title="Confirmar exclusão"
          content={`Tem certeza que deseja excluir o post "${postTitle || 'sem título'}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleConfirm}
          onCancel={() => setShowDialog(false)}
          disableBackdropClick={isPending}
        />
      )}
    </>
  );
}

