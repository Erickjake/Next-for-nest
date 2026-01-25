'use client';
import { cn } from "@/src/lib/utils";

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
          <button className={cn('bg-slate-800', 'px-4', 'py-2', 'rounded-md', 'hover:bg-slate-700', 'transition-colors', 'cursor-pointer', 'disabled:bg-slate-800/50 disabled:cursor-not-allowed')} autoFocus
            onClick={handleCancel} disabled={disableBackdropClick}>Cancelar</button>
          <button className={cn('bg-red-500', 'px-4', 'py-2', 'rounded-md', 'hover:bg-red-700', 'transition-colors', 'cursor-pointer', 'disabled:bg-red-500/50 disabled:cursor-not-allowed')} autoFocus
            onClick={onConfirm} disabled={disableBackdropClick}>Ok</button>
        </div>
      </div>
    </div>
  )
}
