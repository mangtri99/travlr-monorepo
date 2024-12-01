import React from 'react';
import { cn } from '../utils/common';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className, ...props }, ref) => {
  return (
    <button
      type="button"
      className={cn(
        'text-white text-sm px-3 py-1 transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 focus:ring-1 focus:ring-blue-900',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
