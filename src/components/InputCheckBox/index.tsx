import { cn } from "@/src/lib/utils";
import { useId } from "react";

type InputCheckBoxProps = {
  type?: 'checkbox' | 'radio';
  labelText?: string;
} & React.ComponentProps<'input'>;

export default function InputCheckBox({ type = 'checkbox', labelText = '', ...props }: InputCheckBoxProps) {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <input className={cn('w-4 h-4 rounded-lg focus:ring-2 focus:ring-blue-500 transition', props.className)} {...props} type={type} id={id} />
      {labelText && <label className="text-sm" htmlFor={id}>{labelText}</label>}
    </div>
  );
}
