import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Tag } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { generateLocalBusinessSchema } from '../lib/schema';
import { TrustBar } from '../components/layout/TrustBar';
import { buttonVariants } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { NAP } from '../content/nap';
import heroWeldingShot from '../assets/gallery/hero.jpg';

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
                src={heroWeldingShot} 
                alt="Welder working with bright sparks" 
                className="w-full h-[400px] lg:h-[600px] object-cover rounded-sm"
                loading="eager"
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

// Force github sync update...
// Bypassing Cloudflare cache completely... take 2
