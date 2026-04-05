import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../lib/cn';

interface AccordionProps {
  items: { question: string; answer: string }[];
  defaultExpandedCount?: number;
  className?: string;
}

export function Accordion({ items, defaultExpandedCount = 0, className }: AccordionProps) {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(
    new Set(Array.from({ length: defaultExpandedCount }, (_, i) => i))
  );

  const toggle = (index: number) => {
    setExpandedIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {items.map((item, idx) => {
        const isExpanded = expandedIndices.has(idx);
        return (
          <div key={idx} className="flex flex-col">
            <button
              onClick={() => toggle(idx)}
              className="flex items-start justify-between text-left group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm"
              aria-expanded={isExpanded}
            >
              <h3 className="display-sm text-on-background pr-8 group-hover:text-primary transition-colors">
                {item.question}
              </h3>
              <span className="text-primary mt-1 shrink-0">
                {isExpanded ? <Minus size={24} /> : <Plus size={24} />}
              </span>
            </button>
            <div
              className={cn(
                'grid transition-all duration-250 ease-out',
                isExpanded ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <p className="body-base text-on-surface-variant">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
