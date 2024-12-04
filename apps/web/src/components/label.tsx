import { cn } from '../utils/common';

export default function Label({
  children,
  className,
  required,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label
      className={cn('block mb-2 text-sm font-medium text-gray-700', className)}
      {...props}
    >
      {children}
      {required && <span className="text-red-600">*</span>}
    </label>
  );
}
