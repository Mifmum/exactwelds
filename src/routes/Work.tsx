import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { generateWorkSchema } from '../lib/schema';
import { buttonVariants } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { gallery } from '../content/gallery';
import { cn } from '../lib/cn';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'trailers', label: 'Trailers' },
  { id: 'trucks', label: 'Trucks' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'fabrication', label: 'Fabrication' },
  { id: 'before-after', label: 'Before & After' }
];

export function Work() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof gallery[0] | null>(null);

  const filteredGallery = activeCategory === 'all' 
    ? gallery 
    : gallery.filter(p => p.category === activeCategory);

  // Focus trap and scroll lock for modal
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject]);

  return (
    <>
      <SeoHead 
        title="Our Work - Welding Portfolio | Exact Welds Toledo"
        description="Recent mobile welding and fabrication projects from Exact Welds across Toledo and Northwest Ohio. Trailers, equipment, custom work."
        jsonLd={generateWorkSchema()}
      />

      <main className="pb-24 lg:pb-0 pt-[72px]">
        {/* Header */}
        <section className="py-16 lg:py-24 max-w-[1280px] mx-auto px-6 lg:px-12">
          <span className="text-label text-primary block mb-4">PORTFOLIO OF PRECISION</span>
          <h1 className="display-xl uppercase mb-12">
            <span className="text-on-background block">PROVEN IN</span>
            <span className="text-primary block">THE FIELD.</span>
          </h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-16">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-sans font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  activeCategory === cat.id 
                    ? "bg-primary text-on-primary" 
                    : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map(project => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-surface-container-lowest rounded-sm shadow-card hover:shadow-raised transition-all duration-300 overflow-hidden flex flex-col h-full"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    
                  />
                  <div className="absolute top-4 right-4">
                    <Tag variant="secondary" className="bg-surface-container-lowest/90 backdrop-blur-sm">
                      {project.material}
                    </Tag>
                  </div>
                </div>
                <div className="p-6 relative flex-1 flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-0 bg-primary transition-all duration-300 group-hover:h-[2px]" />
                  <h3 className="display-sm uppercase mb-2">{project.title}</h3>
                  <div className="mt-auto pt-4 flex items-center gap-2">
                    <span className="mono-sm text-on-surface-variant">{project.descriptor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-surface-container-low py-20 lg:py-32">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="bg-surface-container-lowest p-8 lg:p-16 rounded-sm shadow-card flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center lg:text-left">
                <h2 className="display-md uppercase mb-4">NEED WORK LIKE THIS?</h2>
                <p className="body-base text-on-surface-variant">
                  Our team delivers technical precision for industrial, commercial, and custom fabrication needs. Let's build something durable.
                </p>
              </div>
              <Link to="/quote" className={buttonVariants({ variant: 'primary' })}>
                GET A FREE QUOTE
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="absolute inset-0 bg-background/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative w-full max-w-5xl bg-surface-container-lowest rounded-md shadow-modal flex flex-col lg:flex-row overflow-hidden max-h-full">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-on-background hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            <div className="w-full lg:w-3/5 h-64 sm:h-80 lg:h-auto shrink-0">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="w-full lg:w-2/5 p-8 lg:p-12 overflow-y-auto flex flex-col">
              <div className="mb-8">
                <Tag variant="primary" className="mb-4">{selectedProject.material}</Tag>
                <h2 className="display-sm uppercase mb-2">{selectedProject.title}</h2>
              </div>
              
              <div className="space-y-6 mb-12 flex-1">
                <div>
                  <h4 className="text-label text-on-background mb-2">THE PROBLEM</h4>
                  <p className="body-sm text-on-surface-variant">
                    Component failure due to stress fatigue and improper initial welding. Required complete removal of compromised material before structural reinforcement.
                  </p>
                </div>
                <div>
                  <h4 className="text-label text-on-background mb-2">WHAT ZACK DID</h4>
                  <p className="body-sm text-on-surface-variant">
                    Excavated old welds, prepped joints to bare metal, and applied multi-pass TIG welding for maximum penetration and aesthetic finish.
                  </p>
                </div>
                <div>
                  <h4 className="text-label text-on-background mb-2">THE RESULT</h4>
                  <p className="body-sm text-on-surface-variant">
                    A joint that exceeds original factory specifications, ready for immediate return to heavy-duty service.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-outline-variant/30 mt-auto">
                <Link to={`/quote?ref=${selectedProject.id}`} className={cn(buttonVariants({ variant: 'primary' }), "w-full text-center")}>
                  NEED WORK LIKE THIS?
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
