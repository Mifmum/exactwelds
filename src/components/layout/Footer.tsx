import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { NAP } from '../../content/nap';

export function Footer() {
  return (
    <footer className="bg-surface-container-low pt-20 pb-12 lg:pb-8">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <span className="font-display font-black text-2xl tracking-wider uppercase text-on-background">
              Exact <span className="text-primary">Welds</span>
            </span>
            <p className="body-sm text-on-surface-variant">
              Technical precision and structural mastery. High-end welding solutions for industrial and architectural projects.
            </p>
            <div className="mt-2 flex items-center gap-2 text-on-background">
              <ShieldCheck size={20} className="text-primary" />
              <span className="text-label">BBB Accredited</span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-label text-on-background">Navigation</h3>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {['Home', 'Services', 'Work', 'About', 'Reviews', 'FAQ'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="body-sm text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm w-fit"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-label text-on-background">Contact</h3>
            <div className="flex flex-col gap-3">
              <a href={`tel:${NAP.phoneE164}`} className="mono-md text-on-background hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm w-fit">
                {NAP.phone}
              </a>
              <a href={`mailto:${NAP.email}`} className="body-sm text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm w-fit">
                {NAP.email}
              </a>
              <p className="body-sm text-on-surface-variant">
                {NAP.serviceArea}
              </p>
            </div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-label text-on-background">Legal</h3>
            <nav className="flex flex-col gap-3" aria-label="Legal navigation">
              {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="body-sm text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-sm w-fit"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="body-sm text-on-surface-muted text-center md:text-left">
            &copy; {new Date().getFullYear()} Exact Welds. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-high text-label text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-primary mr-2" />
              Licensed & Insured
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
