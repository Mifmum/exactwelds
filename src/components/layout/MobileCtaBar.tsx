import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { NAP } from '../../content/nap';
import { cn } from '../../lib/cn';

export function MobileCtaBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-outline-variant/30 pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16">
        <a 
          href={`tel:${NAP.phoneE164}`}
          className="flex-1 flex items-center justify-center gap-2 bg-surface-container-lowest text-on-background font-sans font-bold uppercase tracking-wide text-sm border-r border-outline-variant/30 active:bg-surface-container-low transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
        >
          <Phone size={18} className="text-primary" />
          Call
        </a>
        <Link 
          to="/quote"
          className="flex-1 flex items-center justify-center bg-primary text-on-primary font-sans font-bold uppercase tracking-wide text-sm active:bg-primary-pressed transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-on-primary"
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
}
