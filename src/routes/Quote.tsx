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
            <div className="lg:col-span-12 xl:col-span-8 xl:col-start-3 order-2 lg:order-1 flex flex-col gap-12">
              <QuoteForm />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                
                <Card className="bg-surface-container-lowest p-6 flex flex-col items-center text-center">
                  <MapPin size={24} className="text-primary mb-4" />
                  <div className="text-label text-on-background mb-1">SERVICE AREA</div>
                  <div className="body-sm text-on-surface-variant">Toledo & NW Ohio</div>
                </Card>
              </div>
            </div>
            
          </div>
        </section>
      </main>
    </>
  );
}

// Sync Quote again
