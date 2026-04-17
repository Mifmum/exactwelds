import React from 'react';
import { cn } from '../../lib/cn';

export const buttonVariants = ({ variant = 'primary', className }: { variant?: 'primary' | 'secondary' | 'tertiary', className?: string } = {}) => {
  return cn(
    'inline-flex items-center justify-center rounded-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none',
    variant === 'primary' && 'bg-primary text-on-primary hover:bg-primary-container hover:scale-[1.01] active:bg-primary-pressed h-14 px-8 font-sans font-bold uppercase tracking-wide',
    variant === 'secondary' && 'bg-dark-panel text-on-dark-panel border-2 border-on-background hover:bg-on-background hover:text-background h-14 px-8 font-sans font-bold uppercase tracking-wide',
    variant === 'tertiary' && 'text-primary mono-md relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full',
    className
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant: variant as 'primary' | 'secondary' | 'tertiary', className })}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
