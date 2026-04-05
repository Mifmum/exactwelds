import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { generateServicesSchema } from '../lib/schema';
import { Button, buttonVariants } from '../components/ui/Button';
import { SpecPlate } from '../components/ui/SpecPlate';
import { Tag } from '../components/ui/Tag';
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
        {/* Header */}
        <section className="bg-surface-container-low py-16 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Sidebar Nav */}
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24">
                  <div className="text-label text-on-surface-variant mb-6">SERVICE MENU</div>
                  <nav className="flex flex-col gap-2 mb-12">
                    {services.map((service) => (
                      <a 
                        key={service.id}
                        href={`#${service.id}`}
                        className="text-sm font-sans font-semibold uppercase tracking-wide py-3 px-4 rounded-sm hover:bg-surface-container transition-colors border-l-2 border-transparent hover:border-outline text-on-surface-variant"
                      >
                        {service.title}
                      </a>
                    ))}
                  </nav>
                  
                  <div className="bg-surface-container p-6 rounded-sm">
                    <div className="text-label text-primary mb-2">TECHNICAL INQUIRY</div>
                    <p className="body-sm text-on-surface-variant mb-6">
                      Standard response time for technical assessments is under 4 hours.
                    </p>
                    <Link to="/quote" className={cn(buttonVariants({ variant: 'secondary' }), "w-full text-sm px-4 h-12")}>
                      CONTACT SHOP
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main Content Header */}
              <div className="lg:col-span-9">
                <span className="text-label text-primary block mb-4">TECHNICAL EXPERTISE</span>
                <h1 className="display-xl uppercase mb-6">TECHNICAL SERVICES</h1>
                <p className="body-lg text-on-surface-variant max-w-2xl">
                  Precision-driven industrial welding and metallurgical services delivered with master-level craftsmanship. From onsite repairs to custom shop fabrication.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services List */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="hidden lg:block lg:col-span-3" /> {/* Spacer for sidebar */}
            
            <div className="lg:col-span-9 flex flex-col gap-32">
              {services.map((service, index) => {
                const isEven = index % 2 === 0;
                return (
                  <section key={service.id} id={service.id} className="scroll-mt-32">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                      <div className={!isEven ? 'lg:order-2' : ''}>
                        <Tag variant="primary" className="mb-6">SERVICE 0{index + 1}</Tag>
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

                        <SpecPlate label="SPECS" value={service.specs} className="mb-10" />

                        <Link to={`/quote?service=${service.id}`} className={buttonVariants({ variant: 'primary' })}>
                          GET A QUOTE FOR {service.title.split(' ')[0]}
                        </Link>
                      </div>

                      <div className={!isEven ? 'lg:order-1' : ''}>
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-[400px] lg:h-[600px] object-cover rounded-sm shadow-card"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </section>
                );
              })}

              {/* Bottom CTA */}
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
        </div>
      </main>
    </>
  );
}
