import { cn } from '../utils/common';

export default function Label({
  children,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) {
  return (
    <label
      className={cn('block mb-2 text-sm font-medium text-gray-700', className)}
      {...props}
    >
      {children}
    </label>
  );
}
