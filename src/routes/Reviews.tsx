import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, PenLine, Check, Quote, Wrench } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { generateLocalBusinessSchema } from '../lib/schema';
import { Button, buttonVariants } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionDivider } from '../components/layout/SectionDivider';

export function Reviews() {
  return (
    <>
      <SeoHead 
        title="Reviews - BBB Accredited Welder | Exact Welds Toledo"
        description="Exact Welds is BBB Accredited in Toledo, Ohio. Read verified feedback from homeowners and businesses across Northwest Ohio."
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
                <a href="#" className={buttonVariants({ variant: 'primary' })}>
                  REVIEW US ON GOOGLE
                </a>
                <a href="#" className={buttonVariants({ variant: 'primary' })}>
                  REVIEW US ON FACEBOOK
                </a>
                <a href="#" className={buttonVariants({ variant: 'secondary' })}>
                  REVIEW US ON BBB
                </a>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* What Customers Are Saying */}
        <section className="py-16 lg:py-24 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="display-lg uppercase mb-2">WHAT CUSTOMERS ARE SAYING</h2>
              <span className="text-label text-primary">VERIFIED CLIENT FEEDBACK</span>
            </div>
            <p className="body-sm text-on-surface-variant italic max-w-xs text-left md:text-right">
              Honest feedback from homeowners and business owners across the region.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={20} className="text-primary fill-primary" />
                  ))}
                </div>
                <h3 className="display-md uppercase mb-4">AWAITING OUR FIRST REVIEW</h3>
                <p className="body-lg text-on-surface-variant mb-8 max-w-xl">
                  We've just launched our public feedback portal. If we've helped you with a repair or custom project recently, we'd love to hear about your experience with our team.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-sm w-fit">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <PenLine size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-label text-on-background">SHARE YOUR STORY</div>
                  <div className="body-sm text-on-surface-variant">Click any button above to leave a review</div>
                </div>
              </div>
            </Card>

            <Card className="bg-surface-container-low border-none shadow-none flex flex-col justify-between">
              <div>
                <Quote size={32} className="text-primary mb-6" />
                <p className="body-lg text-on-background italic mb-8">
                  "The quality of our work is our strongest recommendation. We treat every project like it's for our own family."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-on-primary">
                  <Wrench size={20} />
                </div>
                <div>
                  <div className="text-label text-on-background">OUR PROMISE</div>
                  <div className="body-sm text-on-surface-variant">SERVICE & RELIABILITY</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="bg-surface-container-low border-none shadow-none">
              <h3 className="display-sm uppercase mb-8">WHY CHOOSE US</h3>
              <ul className="flex flex-col gap-6">
                <li className="flex gap-4">
                  <div className="mt-1 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Check size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-label text-on-background mb-1">ON-TIME SERVICE</div>
                    <div className="body-sm text-on-surface-variant">We respect your schedule.</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Check size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-label text-on-background mb-1">FAIR PRICING</div>
                    <div className="body-sm text-on-surface-variant">No hidden fees, just honest work.</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Check size={14} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-label text-on-background mb-1">LOCAL EXPERTS</div>
                    <div className="body-sm text-on-surface-variant">A team that knows the community.</div>
                  </div>
                </li>
              </ul>
            </Card>

            <div className="lg:col-span-2 relative rounded-sm overflow-hidden shadow-card">
              <img 
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&sat=-100" 
                alt="Welding quality" 
                className="w-full h-full min-h-[300px] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-panel/90 via-dark-panel/40 to-transparent flex flex-col justify-end p-8">
                <h3 className="display-md uppercase text-on-dark-panel mb-2">QUALITY YOU CAN SEE</h3>
                <p className="text-label text-primary">BUILT TO LAST, GUARANTEED SERVICE</p>
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
