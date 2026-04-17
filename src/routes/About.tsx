import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, FileCheck } from 'lucide-react';
import { SeoHead } from '../components/seo/SeoHead';
import { generatePersonSchema } from '../lib/schema';
import { Card } from '../components/ui/Card';
import { NAP } from '../content/nap';

export function About() {
  return (
    <>
      <SeoHead 
        title="About Exact Welds - Toledo Mobile Welder | Owner-Operated"
        description="Exact Welds is an owner-operated mobile welding service in Northwest Ohio. BBB Accredited, fully insured, years of hands-on experience. Meet Zack."
        jsonLd={generatePersonSchema()}
      />

      <main className="pb-24 lg:pb-0 pt-[72px]">
        {/* Hero */}
        <section className="py-16 lg:py-24 max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <h1 className="display-xl uppercase max-w-5xl mx-auto">
            <span className="text-on-background">MEET ZACK MILLER – </span>
            <span className="text-primary">OWNER OF EXACT WELDS</span>
          </h1>
        </section>

        {/* Hero Photo */}
        <section className="w-full h-[400px] lg:h-[600px]">
          <img 
            src="/gallery/hero.jpg" 
            alt="Zack Miller welding" 
            className="w-full h-full object-cover"
            loading="eager"
          />
        </section>

        {/* Verified Authority */}
        <section className="py-20 lg:py-32 bg-surface-container-low">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <h2 className="display-lg uppercase">VERIFIED AUTHORITY</h2>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-surface-container-lowest shadow-card text-label text-on-surface-variant">
                <ShieldCheck size={16} className="text-primary mr-2" />
                Fully Insured & Licensed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center flex flex-col items-center">
                <Award size={32} className="text-primary mb-6" />
                <h3 className="display-sm uppercase mb-4">AWS CERTIFIED</h3>
                <p className="body-sm text-on-surface-variant">
                  American Welding Society Structural Steel Certified
                </p>
              </Card>
              <Card className="text-center flex flex-col items-center">
                <ShieldCheck size={32} className="text-primary mb-6" />
                <h3 className="display-sm uppercase mb-4">BBB ACCREDITED</h3>
                <p className="body-sm text-on-surface-variant">
                  Accredited March 12, 2026<br/>A+ Industry Rating
                </p>
              </Card>
              <Card className="text-center flex flex-col items-center">
                <FileCheck size={32} className="text-primary mb-6" />
                <h3 className="display-sm uppercase mb-4">$2M GENERAL LIABILITY</h3>
                <p className="body-sm text-on-surface-variant">
                  Full comprehensive insurance for any job site
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* The Code I Work By */}
        <section className="py-20 lg:py-32 bg-dark-panel text-on-dark-panel">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <h2 className="display-lg uppercase mb-6">THE CODE I WORK BY</h2>
                <p className="body-lg text-on-surface-variant">
                  In this industry, your reputation is only as strong as your last weld. I operate on three core principles that define every project.
                </p>
              </div>
              
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-surface-container-lowest/5 p-8 rounded-sm border border-outline-variant/10">
                  <span className="mono-md text-primary block mb-4">01</span>
                  <h3 className="display-sm uppercase mb-4">ABSOLUTE QUALITY</h3>
                  <p className="body-base text-on-surface-variant">
                    We don't do "temporary fixes." If it's not structural, secure, and clean, it's not finished.
                  </p>
                </div>
                <div className="bg-surface-container-lowest/5 p-8 rounded-sm border border-outline-variant/10">
                  <span className="mono-md text-primary block mb-4">02</span>
                  <h3 className="display-sm uppercase mb-4">TOTAL HONESTY</h3>
                  <p className="body-base text-on-surface-variant">
                    Transparent pricing and realistic timelines. No hidden fees, no technical jargon to hide the truth.
                  </p>
                </div>
                <div className="bg-surface-container-lowest/5 p-8 rounded-sm border border-outline-variant/10">
                  <span className="mono-md text-primary block mb-4">03</span>
                  <h3 className="display-sm uppercase mb-4">SHOWING UP</h3>
                  <p className="body-base text-on-surface-variant">
                    When I say I'll be there at 8:00 AM, the rig is idling in your driveway at 7:55 AM.
                  </p>
                </div>
                <div className="bg-surface-container-lowest/5 p-8 rounded-sm border border-outline-variant/10">
                  <span className="mono-md text-primary block mb-4">04</span>
                  <h3 className="display-sm uppercase mb-4">STANDING BEHIND IT</h3>
                  <p className="body-base text-on-surface-variant">
                    If there's an issue with my work, I'm back on site to fix it. No questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Coverage */}
        <section className="py-20 lg:py-32 max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full bg-surface-container-low rounded-sm flex items-center justify-center overflow-hidden">
              {/* Abstract Map Graphic */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <circle cx="50%" cy="50%" r="20%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="50%" cy="50%" r="40%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>
              <div className="relative z-10 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(173,44,0,0.8)]" />
              </div>
            </div>

            <div>
              <h2 className="display-lg uppercase mb-6">MOBILE COVERAGE</h2>
              <p className="body-lg text-on-surface-variant mb-10">
                Based in the heart of the industrial district, I serve a 60-mile radius with fully equipped mobile units. We bring the heat to you.
              </p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
                {NAP.cities.map(city => (
                  <div key={city} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-label text-on-background">{city}</span>
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-sm">
                <ShieldCheck size={20} className="text-primary" />
                <span className="text-label text-on-background">EMERGENCY SERVICE AVAILABLE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary text-on-primary py-20 lg:py-32 text-center">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h2 className="display-xl uppercase mb-6">WORK WITH ZACK – GET A FREE QUOTE</h2>
            <p className="body-lg text-on-primary/90 mb-12">
              Ready for technical precision? Call or message now to discuss your project requirements and get a professional estimate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/quote" className="bg-surface-container-lowest text-primary hover:bg-surface-container-low h-14 px-8 inline-flex items-center justify-center rounded-sm font-sans font-bold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface-container-lowest">
                START YOUR PROJECT
              </Link>
              <a href={`tel:${NAP.phoneE164}`} className="bg-transparent border-2 border-on-primary text-on-primary hover:bg-on-primary hover:text-primary h-14 px-8 inline-flex items-center justify-center rounded-sm font-sans font-bold uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface-container-lowest">
                CALL {NAP.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
// Sync About.tsx
    </>
  );
}
