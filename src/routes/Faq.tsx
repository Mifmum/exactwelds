import React from 'react';
import { SeoHead } from '../components/seo/SeoHead';
import { generateFaqSchema } from '../lib/schema';
import { Accordion } from '../components/ui/Accordion';
import { Card } from '../components/ui/Card';
import { Button, buttonVariants } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { NAP } from '../content/nap';
import { faqGroups } from '../content/faq';

export function Faq() {
  return (
    <>
      <SeoHead 
        title="FAQ - Mobile Welding Questions | Exact Welds Toledo"
        description="Common questions about mobile welding in Toledo: service area, pricing, certifications, emergency response, and more. Answered by Exact Welds."
        jsonLd={generateFaqSchema()}
      />

      <main className="pb-24 lg:pb-0 pt-[72px]">
        {/* Hero */}
        <section className="py-16 lg:py-24 max-w-[1280px] mx-auto px-6 lg:px-12 border-b border-outline-variant/30">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div>
              <span className="text-label text-primary block mb-4">TECHNICAL RESOURCE</span>
              <h1 className="display-2xl uppercase">
                <span className="block">FREQUENTLY</span>
                <span className="block">ASKED</span>
                <span className="block">QUESTIONS</span>
              </h1>
            </div>
            <div className="bg-surface-container-low p-6 rounded-sm border-l-2 border-primary">
              <div className="text-label text-on-surface-variant mb-1">LAST UPDATE</div>
              <div className="mono-md text-primary">OCT 2024</div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <nav className="flex flex-col gap-4 mb-12">
                  <a href="#capabilities" className="text-label text-on-background hover:text-primary transition-colors">01. CAPABILITIES</a>
                  <a href="#service-area" className="text-label text-on-background hover:text-primary transition-colors">02. SERVICE AREA</a>
                  <a href="#pricing" className="text-label text-on-background hover:text-primary transition-colors">03. PRICING</a>
                  <a href="#scheduling" className="text-label text-on-background hover:text-primary transition-colors">04. SCHEDULING</a>
                </nav>
                
                <div className="bg-surface-container-low p-6 rounded-sm">
                  <div className="text-label text-on-surface-variant mb-4">DIRECT SUPPORT</div>
                  <a href={`tel:${NAP.phoneE164}`} className="mono-md text-on-background hover:text-primary transition-colors text-xl">
                    {NAP.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Sections */}
            <div className="lg:col-span-9 flex flex-col gap-24">
              
              {/* Capabilities */}
              <div id="capabilities" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-8 h-[2px] bg-outline-variant" />
                  <h2 className="display-md uppercase">CAPABILITIES</h2>
                </div>
                <Accordion items={faqGroups[0].items} defaultExpandedCount={3} />
              </div>

              {/* Mid-page CTA */}
              <div className="bg-primary text-on-primary p-8 lg:p-12 rounded-sm shadow-card flex flex-col sm:flex-row items-center justify-between gap-8">
                <h3 className="display-md uppercase">STILL HAVE QUESTIONS?</h3>
                <Link to="/quote" className="bg-surface-container-lowest text-primary hover:bg-surface-container-low h-14 px-8 inline-flex items-center justify-center rounded-sm font-sans font-bold uppercase tracking-wide transition-colors shrink-0">
                  GET A FREE QUOTE
                </Link>
              </div>

              {/* Service Area */}
              <div id="service-area" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-8 h-[2px] bg-outline-variant" />
                  <h2 className="display-md uppercase">SERVICE AREA</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-surface-container-low border-none shadow-none">
                    <div className="text-label text-primary mb-4">COVERAGE</div>
                    <h3 className="display-sm uppercase mb-4">WHAT IS YOUR PRIMARY SERVICE RADIUS?</h3>
                    <p className="body-base text-on-surface-variant">
                      Exact Welds is based in Toledo, OH. Our primary service radius covers 50 miles, including Maumee, Perrysburg, Oregon, and Sylvania.
                    </p>
                  </Card>
                  <Card className="bg-surface-container-low border-none shadow-none">
                    <div className="text-label text-primary mb-4">DISTANCE</div>
                    <h3 className="display-sm uppercase mb-4">DO YOU TRAVEL OUTSIDE OF NORTHWEST OHIO?</h3>
                    <p className="body-base text-on-surface-variant">
                      For large-scale industrial projects, we provide services throughout Michigan and Indiana. Travel fees are calculated based on mileage from our Toledo headquarters.
                    </p>
                  </Card>
                </div>
              </div>

              {/* Pricing */}
              <div id="pricing" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-8 h-[2px] bg-outline-variant" />
                  <h2 className="display-md uppercase">PRICING</h2>
                </div>
                <Accordion items={faqGroups[1].items} />
              </div>

              {/* Scheduling */}
              <div id="scheduling" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-8 h-[2px] bg-outline-variant" />
                  <h2 className="display-md uppercase">SCHEDULING</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="border border-outline-variant/30 shadow-none">
                    <h3 className="text-label text-on-background mb-4">LEAD TIMES</h3>
                    <p className="body-sm text-on-surface-variant">
                      Standard shop lead times are 7-10 business days for most fabrications.
                    </p>
                  </Card>
                  <Card className="border border-outline-variant/30 shadow-none">
                    <h3 className="text-label text-on-background mb-4">RUSH ORDERS</h3>
                    <p className="body-sm text-on-surface-variant">
                      Expedited service (48-hour turnaround) is available for critical manufacturing components.
                    </p>
                  </Card>
                  <Card className="border border-outline-variant/30 shadow-none">
                    <h3 className="text-label text-on-background mb-4">CONSULTATIONS</h3>
                    <p className="body-sm text-on-surface-variant">
                      Schedule a technical consultation at our Toledo facility via our online portal.
                    </p>
                  </Card>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Dark CTA Band */}
        <section className="bg-dark-panel text-on-dark-panel py-20 lg:py-32 text-center">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <span className="text-label text-primary block mb-4">TAKE THE NEXT STEP</span>
            <h2 className="display-xl uppercase mb-6">READY FOR TECHNICAL PRECISION?</h2>
            <p className="body-lg text-on-surface-variant mb-12">
              Contact the experts at Exact Welds today for a detailed assessment of your industrial or custom project in Toledo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/quote" className={buttonVariants({ variant: 'primary' })}>
                START YOUR QUOTE
              </Link>
              <Link to="/work" className={buttonVariants({ variant: 'secondary' })}>
                VIEW OUR WORK
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
