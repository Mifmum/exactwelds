import React from 'react';
import { cn } from '../../lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface-container-lowest rounded-sm shadow-card p-6 lg:p-8 relative overflow-hidden',
          interactive && 'transition-all duration-300 hover:shadow-raised hover:-translate-y-1 cursor-pointer before:absolute before:top-0 before:left-0 before:right-0 before:h-0 before:bg-primary before:transition-all before:duration-300 hover:before:h-[2px]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
