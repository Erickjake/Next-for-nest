'use client';
import { cn } from "@/src/lib/utils";
import { Button } from "../Button";

type DialogProps = {
  title: string;
  content: string;
  isVisible?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  disableBackdropClick: boolean;
}
export default function Dialog({ title, content, isVisible = false, onConfirm, onCancel, disableBackdropClick }: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disableBackdropClick) return;
    onCancel();
  }
  return (
    <div className={cn('fixed', 'inset-0', 'bg-black/50 backdrop-blur-xs:', 'flex', 'items-center', 'justify-center',
      'z-50')} onClick={handleCancel}>
      <div className={cn('bg-slate-600', 'p-6', 'rounded-lg', 'max-w-md', 'mx-6', 'flex', 'flex-col', 'gap-6', 'text-white text-center', 'shadow-lg shadow-slate-300/30')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className="text-xl font-extrabold text-slate-900">{title}</h3>
        <div id="dialog-content">{content}</div>
        <div className="flex items-center justify-around">
          <Button autoFocus
            onClick={handleCancel} disabled={disableBackdropClick} variant={"danger"} size={"md"}>Cancelar</Button>
          <Button autoFocus
            onClick={onConfirm} disabled={disableBackdropClick} variant={"default"} size={"md"}>Ok</Button>
        </div>
      </div>
    </div>
  )
}
