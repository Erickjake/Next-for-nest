import { cn } from "@/src/lib/utils";
import { useId } from "react";

type InputTextProps =
  {
    labelText?: string;
  } & React.ComponentProps<'input'>;

export default function InputText({ labelText = '', ...props }: InputTextProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      {labelText && <label className="text-sm" htmlFor={id}>{labelText}</label>}
      <input className={cn('rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ring-offset-2 ring transition ', props.className
        , 'placeholder:text-gray-400 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100', 'disabled:opacity-50 disabled:cursor-not-allowed'
      )} {...props} id={id} autoFocus />
    </div>
  );
}
