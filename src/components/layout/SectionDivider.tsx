import React from 'react';
import { cn } from '../../lib/cn';

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center py-12", className)}>
      <div className="absolute left-0 right-0 h-[1px] bg-outline-variant opacity-50" />
      <div className="relative z-10 text-primary bg-background px-4">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 0L6.8 4.2L12 6L6.8 7.8L6 12L5.2 7.8L0 6L5.2 4.2L6 0Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
}
