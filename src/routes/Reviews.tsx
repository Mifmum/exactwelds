import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Wrench } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { generateLocalBusinessSchema } from '../lib/schema';
import { buttonVariants } from '../components/ui/Button';

export function Reviews() {
  return (
    <>
      <SeoHead 
        title="Verified Welding Reviews: Structural Repair & Fabrication | Exact Welds Toledo"
        description="Read verified customer reviews for Exact Welds in Toledo, OH. Expert mobile welder providing structural repair, custom fabrication, and certified mobile welding services in Northwest Ohio."
        jsonLd={generateLocalBusinessSchema()} // Could add aggregateRating here later
      />

      <main className="pb-24 lg:pb-0 pt-[72px]">
        {/* Hero */}
        <section className="py-16 lg:py-24 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="bg-surface-container-lowest p-8 shadow-raised rounded-sm text-center max-w-xs w-full">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck size={32} className="text-primary" />
                </div>
                <h2 className="display-sm uppercase mb-2">BBB ACCREDITED</h2>
                <p className="text-label text-primary">MARCH 12, 2026</p>
              </div>
            </div>
            
            <div className="lg:col-span-8">
              <h1 className="display-xl uppercase mb-6">
                <span className="text-on-background block">PRECISION</span>
                <span className="text-primary block">ON THE RECORD.</span>
              </h1>
              <p className="body-lg text-on-surface-variant mb-10 max-w-2xl">
                Exact Welds became BBB Accredited in March 2026. We're collecting reviews from current customers now — check back, or be one of the first to leave yours.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.google.com/search?q=Exact+Welds#lrd=0x4fa24c4bc103f4db:0x1372ca3d541120dd,3,,,," target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'primary' })}>
                  REVIEW US ON GOOGLE
                </a>
                <a href="https://www.facebook.com/exactwelds/reviews" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'primary' })}>
                  REVIEW US ON FACEBOOK
                </a>
                <a href="https://www.bbb.org/us/oh/toledo/profile/welding/exact-welds-mobile-welding-0422-211020886/customer-reviews" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'secondary' })}>
                  REVIEW US ON BBB
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* Dark CTA Panel */}
        <section className="bg-dark-panel text-on-dark-panel py-20 lg:py-32 text-center">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <Wrench size={48} className="text-primary mx-auto mb-8" />
            <h2 className="display-xl uppercase mb-6">NEED A HAND WITH YOUR NEXT REPAIR?</h2>
            <p className="body-lg text-on-surface-variant mb-12">
              From small home fixes to large custom fabrications, our team is ready to provide the reliable service you deserve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/quote" className={buttonVariants({ variant: 'primary' })}>
                REQUEST QUOTE
              </Link>
              <Link to="/services" className={buttonVariants({ variant: 'secondary' })}>
                OUR SERVICES
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
