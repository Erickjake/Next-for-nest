import { cn } from "@/src/lib/utils";

type ButtonProps = {
  variant: 'default' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
} & React.ComponentProps<'button'>;


export function Button({ variant = 'default', size = 'md', ...props }: ButtonProps) {
  const buttonVariants: Record<ButtonProps['variant'], string> = {
    default: cn('bg-blue-600 text-white hover:bg-blue-700', 'px-4 py-2 rounded-md', 'transition-colors', 'font-medium'),
    ghost: cn('bg-transparent text-blue-600 hover:bg-blue-100', 'px-4 py-2 rounded-md', 'transition-colors', 'font-medium'),
    danger: cn('bg-red-600 text-white hover:bg-red-700', 'px-4 py-2 rounded-md', 'transition-colors', 'font-medium'),
  }

  const sizeVariants: Record<ButtonProps['size'], string> = {
    sm: cn('text-xs/tight px-2.5 py-1.5', '[&>svg]:w-3 [&>svg]:h-3 gap-1'),
    md: cn('text-base/tight px-4 py-2', '[&>svg]:w-4 [&>svg]:h-4 gap-2'),
    lg: cn('text-lg/tight px-6 py-3', '[&>svg]:w-5 [&>svg]:h-5 gap-3'),
  };

  const buttonClasses = cn(buttonVariants[variant], sizeVariants[size], 'flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed', props.className);
  return <button {...props} className={buttonClasses} />
}
