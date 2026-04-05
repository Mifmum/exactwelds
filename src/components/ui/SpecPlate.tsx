import React from 'react';
import { cn } from '../../lib/cn';

interface SpecPlateProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
}

export const SpecPlate = React.forwardRef<HTMLDivElement, SpecPlateProps>(
  ({ className, label, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface-container-high p-4 relative',
          className
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 w-[2px] h-[2px] bg-primary" />
        <div className="text-label text-on-surface-variant mb-1">{label}</div>
        <div className="mono-md text-on-background">{value}</div>
      </div>
    );
  }
);
SpecPlate.displayName = 'SpecPlate';
