import * as React from 'react';
import { cn } from '../utils/common';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { message?: string; id: string }
>(({ className, message, ...props }, ref) => {
  return (
    <div>
      <input
        className={cn(
          'w-full aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500 aria-[invalid=true]:border focus:outline-none px-2 py-2 text-sm rounded-sm form-input disabled:opacity-50 disabled:cursor-not-allowed ',
          className
        )}
        ref={ref}
        type="text"
        {...props}
      />
      {message && <div className="mt-2 text-xs text-red-500">{message}</div>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
