import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { buttonVariants } from '../ui/Button';
import { NAP } from '../../content/nap';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'SERVICES', path: '/services' },
  { name: 'WORK', path: '/work' },
  { name: 'ABOUT', path: '/about' },
  { name: 'REVIEWS', path: '/reviews' },
  { name: 'FAQ', path: '/faq' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Trap focus and prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[72px] flex items-center',
        isScrolled ? 'bg-background/85 backdrop-blur-xl shadow-card' : 'bg-background'
      )}
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link to="/" className="text-on-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm" aria-label="Exact Welds Home">
          <span className="font-display font-black text-2xl tracking-wider uppercase">
            Exact <span className="text-primary">Welds</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => cn(
                'font-sans font-semibold text-[15px] transition-colors relative focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm',
                isActive ? 'text-on-background after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary' : 'text-on-surface-variant hover:text-on-background'
              )}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href={`tel:${NAP.phoneE164}`} className={buttonVariants({ variant: 'primary' })}>
            GET A FREE QUOTE
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-on-background focus-visible:outline-2 focus-visible:outline-primary rounded-sm"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col">
          <div className="h-[72px] px-6 flex items-center justify-between border-b border-outline-variant/30">
            <Link to="/" className="text-on-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm">
              <span className="font-display font-black text-2xl tracking-wider uppercase">
                Exact <span className="text-primary">Welds</span>
              </span>
            </Link>
            <button
              className="p-2 text-on-background focus-visible:outline-2 focus-visible:outline-primary rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col px-6 py-8 gap-6 overflow-y-auto" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  'display-sm uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-sm inline-block',
                  isActive ? 'text-primary' : 'text-on-background'
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="p-6 border-t border-outline-variant/30">
            <a href={`tel:${NAP.phoneE164}`} className={cn(buttonVariants({ variant: 'primary' }), 'w-full')}>
              GET A FREE QUOTE
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
