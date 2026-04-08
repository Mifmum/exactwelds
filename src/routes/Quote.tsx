import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { QuoteForm } from '../components/forms/QuoteForm';
import { Card } from '../components/ui/Card';
import { NAP } from '../content/nap';

export function Quote() {
  return (
    <>
      <SeoHead 
        title="Get a Free Welding Quote | Exact Welds Toledo"
        description="Request a free mobile welding quote in Toledo or Northwest Ohio. Most quotes returned within 24 hours. Photos get faster estimates."
      />

      <main className="pb-24 lg:pb-0 pt-[72px] bg-surface-container-low min-h-screen">
        <section className="py-16 lg:py-24 max-w-[1280px] mx-auto px-6 lg:px-12">
          <h1 className="display-xl uppercase mb-12">
            <span className="text-on-background block">PRECISION</span>
            <span className="text-primary block">QUOTING.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Form Column */}
            <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
              <QuoteForm />
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2 flex flex-col gap-6">
              
              <Card className="border-none shadow-none bg-surface-container-lowest">
                <h2 className="display-sm uppercase mb-2">GET A FREE WELDING QUOTE</h2>
                <p className="body-base text-on-surface-variant">
                  Most quotes come back within 24 hours.
                </p>
              </Card>

              <Card className="border-l-4 border-l-primary border-t-0 border-r-0 border-b-0 rounded-l-none bg-surface-container-lowest flex items-center gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <div className="text-label text-on-background mb-1">EMERGENCY OR QUESTIONS?</div>
                  <a href={`tel:${NAP.phoneE164}`} className="display-sm text-on-background hover:text-primary transition-colors">
                    {NAP.phone}
                  </a>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-surface-container-lowest p-6 flex flex-col items-center text-center">
                  <MapPin size={24} className="text-primary mb-4" />
                  <div className="text-label text-on-background mb-1">SERVICE AREA</div>
                  <div className="body-sm text-on-surface-variant">Toledo & NW Ohio</div>
                </Card>
                <Card className="bg-surface-container-lowest p-6 flex flex-col items-center text-center">
                  <Clock size={24} className="text-primary mb-4" />
                  <div className="text-label text-on-background mb-1">SHOP HOURS</div>
                  <div className="body-sm text-on-surface-variant">Mon-Fri: 7am - 6pm</div>
                </Card>
              </div>

              <Card className="bg-surface-container-lowest flex items-center gap-6">
                <div className="w-12 h-12 bg-surface-container-high rounded-sm flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} className="text-on-surface-variant" />
                </div>
                <div>
                  <div className="text-label text-on-background mb-1">CERTIFIED AUTHORITY</div>
                  <div className="body-sm text-on-surface-variant">AWS CERTIFIED WELDER</div>
                </div>
              </Card>

              <div className="bg-surface-container-lowest p-6 rounded-sm shadow-card relative">
                <div className="absolute top-0 left-0 w-[4px] h-full bg-primary" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-primary" />
                  <h3 className="text-label text-on-background">PRECISION CAPABILITIES</h3>
                </div>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <div className="text-label text-on-surface-variant mb-1">PROCEDURES</div>
                    <div className="mono-sm text-on-background">MIG / TIG / Stick</div>
                  </div>
                  <div>
                    <div className="text-label text-on-surface-variant mb-1">COMPLIANCE</div>
                    <div className="mono-sm text-on-background">ASTM Certified</div>
                  </div>
                  <div>
                    <div className="text-label text-on-surface-variant mb-1">MAX THICKNESS</div>
                    <div className="mono-sm text-on-background">2.5" Plate</div>
                  </div>
                  <div>
                    <div className="text-label text-on-surface-variant mb-1">MOBILITY</div>
                    <div className="mono-sm text-on-background">Full Field Unit</div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-sm overflow-hidden shadow-card h-64">
                <img 
                  src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&sat=-100" 
                  alt="Welding sparks" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-panel/90 via-dark-panel/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="display-sm uppercase text-on-dark-panel mb-1">THE GOLD STANDARD</h3>
                  <p className="text-label text-primary">EVERY WELD INSPECTED TO AWS STANDARDS</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
