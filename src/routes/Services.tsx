import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { generateServicesSchema } from '../lib/schema';
import { buttonVariants } from '../components/ui/Button';
import { services } from '../content/services';
import { NAP } from '../content/nap';
import { cn } from '../lib/cn';

export function Services() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <SeoHead 
        title="Welding Services - Trailer, Aluminum, Stainless, Fabrication | Exact Welds"
        description="Mobile welding services in Toledo OH: trailer repair, aluminum and stainless welding, custom fabrication, truck body repair, and more. Get a free quote."
        jsonLd={generateServicesSchema()}
      />

      <main className="pb-24 lg:pb-0 pt-[72px]">
        {/* Immersive Hero Section */}
        <section className="bg-surface-container-low border-b border-outline-variant/30">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 lg:py-28 flex justify-center text-center">
            <div className="max-w-3xl flex flex-col items-center">
              {/* Text Content */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-primary" />
                <span className="text-label text-primary tracking-widest uppercase">Certified Technical Welding</span>
                <span className="w-8 h-px bg-primary" />
              </div>
              <h1 className="display-xl uppercase mb-8 leading-[0.9] tracking-tight">
                Industrial <span className="text-primary italic">Precision</span>,<br />
                Structural Mastery.
              </h1>
              <p className="body-lg text-on-surface-variant max-w-xl mx-auto mb-12">
                Toledo's elite mobile welding firm. We specialize in complex metallurgical challenges, from critical structural repairs to high-purity sanitary fabrication.
              </p>
              
              {/* Technical Hotline Component */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-surface-container-high p-4 rounded-sm shadow-raised border border-outline-variant/50">
                <div className="flex items-center gap-4 px-2 text-left">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <a href={`tel:${NAP.phoneE164}`} className="mono-lg text-on-background hover:text-primary transition-colors">{NAP.phone}</a>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-10 bg-outline-variant" />
                <Link to="/quote" className={cn(buttonVariants({ variant: 'primary' }), "h-14 px-10 w-full sm:w-auto")}>
                  GET A QUOTE
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Service Anchor Bar */}
        <nav className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-md border-b border-outline-variant/30 hidden lg:block overflow-x-auto scrollbar-hide" aria-label="Service quick links">
          <div className="max-w-[1280px] mx-auto px-12 flex items-center justify-center gap-1">
            {services.map((service) => (
              <a 
                key={service.id}
                href={`#${service.id}`}
                className="text-[11px] font-sans font-bold uppercase tracking-widest py-5 px-6 whitespace-nowrap text-on-surface-variant hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary active:bg-surface-container-low"
              >
                {service.title.split(' ')[0]}
              </a>
            ))}
          </div>
        </nav>

        {/* Services List Content */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="flex flex-col gap-32">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <section key={service.id} id={service.id} className="scroll-mt-32">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={!isEven ? 'lg:order-2' : ''}>
                      <h2 className="display-md uppercase mb-6">{service.title}</h2>
                      <p className="body-base text-on-surface-variant mb-8">
                        {service.description}
                      </p>
                      
                      <ul className="flex flex-col gap-4 mb-10 bg-surface-container-low p-6 rounded-sm">
                        {service.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                              <Check size={12} className="text-primary" />
                            </div>
                            <span className="body-base text-on-background">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <Link to={`/quote?service=${service.id}`} className={buttonVariants({ variant: 'primary' })}>
                        GET A QUOTE FOR {service.title.split(' ')[0]}
                      </Link>
                    </div>

                    <div className={!isEven ? 'lg:order-1' : ''}>
                      <div className="relative group overflow-hidden rounded-sm shadow-card">
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-50 transition-opacity group-hover:opacity-0 z-10 pointer-events-none"></div>
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-[400px] lg:h-[600px] object-cover filter contrast-[1.1] saturate-[0.85] brightness-[0.95] transition-all duration-500 group-hover:scale-[1.02] group-hover:saturate-100 group-hover:brightness-100 group-hover:contrast-100 relative z-0"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}

            {/* Bottom CTA Section */}
            <section className="bg-surface-container p-8 lg:p-16 rounded-sm text-center">
              <h2 className="display-sm uppercase mb-4">DON'T SEE YOUR SPECIFIC JOB?</h2>
              <p className="body-base text-on-surface-variant max-w-2xl mx-auto mb-10">
                Our master welders handle everything from delicate technical repairs to massive structural projects. Call our shop for a custom technical assessment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href={`tel:${NAP.phoneE164}`} className="bg-surface-container-lowest text-on-background font-sans font-bold uppercase tracking-wide h-14 px-8 flex items-center justify-center rounded-sm shadow-card hover:shadow-raised transition-all">
                  {NAP.phone}
                </a>
                <Link to="/quote" className={buttonVariants({ variant: 'secondary' })}>
                  SEND TECHNICAL FILES
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
