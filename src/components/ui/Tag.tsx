import React from 'react';
import { cn } from '../../lib/cn';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2 py-1 text-label rounded-sm',
          variant === 'primary' && 'bg-primary/10 text-primary',
          variant === 'secondary' && 'bg-surface-container-high text-on-surface-variant',
          variant === 'outline' && 'border border-outline text-on-surface-variant',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Tag.displayName = 'Tag';
