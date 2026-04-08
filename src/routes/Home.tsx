import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Tag, Play } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { generateLocalBusinessSchema } from '../lib/schema';
import { TrustBar } from '../components/layout/TrustBar';
import { Button, buttonVariants } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SpecPlate } from '../components/ui/SpecPlate';
import { NAP } from '../content/nap';

export function Home() {
  return (
    <>
      <SeoHead 
        title="Mobile Welder Toledo & NW Ohio | Exact Welds - We Come to You"
        description="Mobile welding repair and custom fabrication across Toledo and Northwest Ohio. BBB Accredited. Free quotes, flexible payments. Call 567-298-2593."
        jsonLd={generateLocalBusinessSchema()}
      />

      <main className="pb-24 lg:pb-0">
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <h1 className="display-xl lg:display-2xl uppercase">
                <span className="text-on-background block">MOBILE WELDING IN TOLEDO &</span>
                <span className="text-primary block">NORTHWEST OHIO</span>
              </h1>
              <p className="body-lg text-on-surface-variant max-w-xl">
                Repair, fabrication, and custom work — we bring the shop to you. Professional precision delivered to your site.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/quote" className={buttonVariants({ variant: 'primary' })}>
                  GET A FREE QUOTE
                </Link>
                <a href={`tel:${NAP.phoneE164}`} className={buttonVariants({ variant: 'secondary' })}>
                  CALL {NAP.phone}
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900" 
                alt="Welder working with bright sparks" 
                className="w-full h-[400px] lg:h-[600px] object-cover rounded-sm"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 lg:bottom-8 lg:-left-12 bg-surface-container-lowest p-6 shadow-raised rounded-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="text-primary" size={24} />
                </div>
                <div>
                  <div className="text-label text-on-surface-variant">SERVICE TYPE</div>
                  <div className="font-sans font-bold text-on-background uppercase tracking-wide">FULLY MOBILE</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustBar />

        {/* Value Prop Section */}
        <section className="py-20 lg:py-32 bg-surface-container">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <Truck className="text-primary mb-6" size={32} />
                <h3 className="display-sm uppercase mb-4">WE COME TO YOU</h3>
                <p className="body-base text-on-surface-variant">
                  No need to haul heavy equipment. We bring full shop capabilities directly to your location. 24/7 emergency service available.
                </p>
              </Card>
              <Card>
                <ShieldCheck className="text-primary mb-6" size={32} />
                <h3 className="display-sm uppercase mb-4">BUILT TO LAST</h3>
                <p className="body-base text-on-surface-variant">
                  Precision welds that exceed industry standards. We specialize in structural integrity and technical durability for every job.
                </p>
              </Card>
              <Card>
                <Tag className="text-primary mb-6" size={32} />
                <h3 className="display-sm uppercase mb-4">HONEST PRICING</h3>
                <p className="body-base text-on-surface-variant">
                  Transparent estimates and no hidden travel fees. Quality American craftsmanship at a fair, competitive rate.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Precision Services */}
        <section className="py-20 lg:py-32 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="text-label text-primary block mb-4">OUR EXPERTISE</span>
            <h2 className="display-lg uppercase">PRECISION SERVICES</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/services#trailer-repair" className="block group">
              <Card interactive className="h-full flex flex-col">
                <h3 className="display-sm uppercase mb-4">TRAILER REPAIR</h3>
                <p className="body-base text-on-surface-variant mb-8 flex-1">
                  Structural repairs, axle work, and gate hinges for utility and equipment trailers.
                </p>
              </Card>
            </Link>
            
            <Link to="/services#truck-vehicle" className="block group">
              <Card interactive className="h-full flex flex-col">
                <h3 className="display-sm uppercase mb-4">TRUCK AND VEHICLE</h3>
                <p className="body-base text-on-surface-variant mb-8 flex-1">
                  Chassis reinforcement, custom racks, fabrication for fleets.
                </p>
              </Card>
            </Link>

            <Link to="/services#equipment-machinery" className="block group">
              <Card interactive className="h-full flex flex-col">
                <h3 className="display-sm uppercase mb-4">EQUIPMENT AND MACHINERY</h3>
                <p className="body-base text-on-surface-variant mb-8 flex-1">
                  Hardfacing and structural repair for excavators, buckets, and industrial tools.
                </p>
              </Card>
            </Link>

            <Link to="/services#railings-gates" className="block group">
              <Card interactive className="h-full flex flex-col">
                <h3 className="display-sm uppercase mb-4">RAILINGS AND GATES</h3>
                <p className="body-base text-on-surface-variant mb-8 flex-1">
                  Custom ornamental ironwork and security gate repairs with precision finishing.
                </p>
              </Card>
            </Link>

            <Link to="/services#brackets-mounts" className="block group">
              <Card interactive className="h-full flex flex-col">
                <h3 className="display-sm uppercase mb-4">BRACKETS AND MOUNTS</h3>
                <p className="body-base text-on-surface-variant mb-8 flex-1">
                  Precision components for industrial installations and specialized storage solutions.
                </p>
              </Card>
            </Link>

            <Link to="/services#custom-fabrication" className="block group">
              <Card interactive className="h-full flex flex-col">
                <h3 className="display-sm uppercase mb-4">CUSTOM FABRICATION</h3>
                <p className="body-base text-on-surface-variant mb-8 flex-1">
                  From blueprint to reality. We build unique metal solutions tailored to your specs.
                </p>
              </Card>
            </Link>
          </div>
        </section>

        {/* Who We Help */}
        <section className="py-20 lg:py-32 bg-surface-container-low">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1504222490345-c075b6008014?w=900&sat=-100" 
                  alt="Welder working in a home garage" 
                  className="w-full h-[500px] object-cover rounded-sm"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-surface-container-lowest p-8 shadow-raised rounded-sm">
                  <h3 className="display-sm uppercase mb-4">HOMEOWNERS AND DIYERS</h3>
                  <p className="body-base text-on-surface-variant mb-6">
                    Need a mower deck fixed? A fence gate that actually closes? No job is too small for our mobile shop.
                  </p>
                  <Link to="/services" className={buttonVariants({ variant: 'tertiary' })}>
                    RESIDENTIAL SUPPORT
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&sat=-100" 
                  alt="Industrial welder working in a shop" 
                  className="w-full h-[500px] object-cover rounded-sm"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-surface-container-lowest p-8 shadow-raised rounded-sm">
                  <h3 className="display-sm uppercase mb-4">COMMERCIAL AND INDUSTRIAL</h3>
                  <p className="body-base text-on-surface-variant mb-6">
                    Fleet maintenance, production line repairs, and structural site work for NW Ohio businesses.
                  </p>
                  <Link to="/services" className={buttonVariants({ variant: 'tertiary' })}>
                    BUSINESS SERVICES
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proof Block - Dark Panel */}
        <section className="bg-dark-panel py-20 lg:py-32 text-on-dark-panel">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-16 items-center">
              <div className="text-center">
                <span className="text-label text-primary block mb-4">THE EXACT DIFFERENCE</span>
                <h2 className="display-lg uppercase mb-8">BUILT ON TECHNICAL PRECISION</h2>
                <p className="body-lg text-on-surface-variant mb-10">
                  Founded by Zack, Exact Welds is built on a foundation of rigorous technical standards and a commitment to American craftsmanship. We don't just patch things up; we ensure every joint and bead meets the highest industrial specifications.
                </p>
                <Link to="/about" className="inline-flex items-center justify-center gap-2 text-on-dark-panel hover:text-primary transition-colors font-sans font-bold uppercase tracking-wide">
                  <ShieldCheck size={20} className="text-primary" />
                  FULLY INSURED & BBB CERTIFIED
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-32 max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="display-xl uppercase max-w-4xl mx-auto mb-8">
            READY TO STOP LOOKING AT THAT BROKEN THING IN YOUR GARAGE?
          </h2>
          <p className="body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
            Call us now or request a quote online. We'll give you a fair price and a professional finish, right at your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link to="/quote" className={buttonVariants({ variant: 'primary' })}>
              GET A FREE QUOTE
            </Link>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-label text-on-surface-variant mb-1">TALK TO A WELDER</span>
              <a href={`tel:${NAP.phoneE164}`} className="mono-md text-on-background hover:text-primary transition-colors text-xl">
                {NAP.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
