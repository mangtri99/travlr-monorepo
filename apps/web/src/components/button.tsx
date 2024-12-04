import React from 'react';
import { cn } from '../utils/common';
import { Icon } from '@iconify/react';

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }
>(({ children, className, loading, ...props }, ref) => {
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
      <div className="flex items-center gap-x-1">
        {loading && (
          <Icon icon="mdi:loading" className="block text-sm animate-spin" />
        )}
        {children}
      </div>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
