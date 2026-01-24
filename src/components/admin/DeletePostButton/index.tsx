'use client'
import { deletePostAction } from "@/src/actions/post/delete-post-action";
import { cn } from "@/src/lib/utils";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";

type DeletePostButtonProps = {
  id: string;
  title: string;
};
export default function DeletePostButton({ id, title: postTitle }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!confirm('Tem certeza?')) return;

    startTransition(async () => {
      const result = await deletePostAction(id);
      alert(`O result é: ${result}`);

    });

  }
  return (
    <button disabled={isPending} onClick={handleClick} title="Excluir post" aria-label={`Excluir post ${postTitle || 'sem título'}`} className={cn('text-red-500', 'hover:text-red-700', 'ml-4', 'transition-colors', 'cursor-pointer', '[&_svg]:w-4', '[&_svg]:h-4', 'focus:outline-none', 'hover:scale-120', 'transform', 'duration-150', 'disabled:text-slate-600', 'disabled:cursor-not-allowed', 'disabled:hover:scale-100')}>
      <Trash2Icon />
    </button>
  );
}

