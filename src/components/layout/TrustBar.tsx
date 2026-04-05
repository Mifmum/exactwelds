import React from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import { NAP } from '../../content/nap';

export function TrustBar() {
  return (
    <div className="bg-surface-container border-b border-outline-variant/30">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-center lg:justify-between py-4 lg:py-0 lg:h-14 gap-x-8 gap-y-4">
          
          <a href="#" className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm">
            <ShieldCheck size={18} className="text-primary" />
            <span className="text-label text-on-background group-hover:text-primary transition-colors">BBB Accredited Business</span>
          </a>

          <div className="hidden lg:block w-px h-6 bg-outline-variant/50" />

          <div className="flex items-center gap-2">
            <span className="text-label text-on-surface-variant">Fully Insured</span>
          </div>

          <div className="hidden lg:block w-px h-6 bg-outline-variant/50" />

          <div className="flex items-center gap-2">
            <span className="text-label text-on-surface-variant">Mobile Service - We Come To You</span>
          </div>

          <div className="hidden lg:block w-px h-6 bg-outline-variant/50" />

          <div className="flex items-center gap-2">
            <span className="text-label text-on-surface-variant">Serving Toledo & NW Ohio</span>
          </div>

          <div className="hidden lg:block w-px h-6 bg-outline-variant/50" />

          <a href={`tel:${NAP.phoneE164}`} className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm">
            <Phone size={16} className="text-primary" />
            <span className="mono-md text-on-background group-hover:text-primary transition-colors">{NAP.phone}</span>
          </a>

        </div>
      </div>
    </div>
  );
}
