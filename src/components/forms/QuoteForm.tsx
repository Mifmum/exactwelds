import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import { NAP } from '../../content/nap';

const quoteSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  zip: z.string().min(2, 'Enter a ZIP code or city'),
  jobType: z.enum(['repair', 'trailer', 'truck', 'equipment', 'gate', 'brackets', 'fabrication', 'other']),
  material: z.enum(['steel', 'aluminum', 'stainless', 'unsure']).optional(),
  urgency: z.enum(['emergency', 'this-week', 'this-month', 'flexible']),
  description: z.string().min(10, 'Please describe the job in at least a sentence'),
  photos: z.any().optional(), // File handling is complex with Zod in browser, keeping it simple
  website: z.string().max(0, 'Bot detected').optional() // honeypot
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      website: ''
    }
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setStatus('submitting');
    
    // Honeypot check
    if (data.website) {
       setStatus('success');
       return;
    }

    try {
      const subject = `Quote Request from ${data.name}`;
      const body = `Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Timeframe: ${data.timeframe}

Project Details:
${data.details}`;

      window.location.href = `mailto:${NAP.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Show success after a brief delay
      setTimeout(() => {
        setStatus('success');
      }, 1000);
    } catch (err) {
      setStatus('error');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    let formatted = val;
    if (val.length > 0) {
      formatted = '(' + val.slice(0, 3);
      if (val.length > 3) formatted += ') ' + val.slice(3, 6);
      if (val.length > 6) formatted += '-' + val.slice(6, 10);
    }
    setValue('phone', formatted, { shouldValidate: true });
  };

  if (status === 'success') {
    return (
      <div className="bg-surface-container-lowest rounded-sm shadow-card p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className="display-sm uppercase mb-4">THANKS - ZACK WILL BE IN TOUCH WITHIN 24 HOURS</h2>
        <p className="body-base text-on-surface-variant mb-8">
          If you need immediate assistance, call <a href={`tel:${NAP.phoneE164}`} className="mono-md text-primary">{NAP.phone}</a>.
        </p>
        <Button onClick={() => window.location.href = '/'} variant="secondary">Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-sm shadow-card p-6 lg:p-8">
      {status === 'error' && (
        <div className="bg-danger/10 border-l-4 border-danger p-4 mb-6">
          <p className="text-danger font-semibold">There was a problem sending your request.</p>
          <button onClick={() => setStatus('idle')} className="text-sm underline mt-1">Try again</button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-label">FULL NAME</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={cn(
                "bg-surface-container-lowest border-b py-2 focus:outline-none focus:border-b-2 transition-colors",
                errors.name ? "border-danger focus:border-danger" : "border-outline focus:border-primary"
              )}
            />
            {errors.name && <span className="text-danger text-sm">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-label">PHONE NUMBER</label>
            <input
              id="phone"
              type="tel"
              placeholder="(000) 000-0000"
              {...register('phone')}
              onChange={handlePhoneChange}
              className={cn(
                "bg-surface-container-lowest border-b py-2 focus:outline-none focus:border-b-2 transition-colors mono-md",
                errors.phone ? "border-danger focus:border-danger" : "border-outline focus:border-primary"
              )}
            />
            {errors.phone && <span className="text-danger text-sm">{errors.phone.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-label">EMAIL <span className="text-on-surface-muted normal-case font-normal ml-2">(Optional - phone is faster for trades)</span></label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={cn(
                "bg-surface-container-lowest border-b py-2 focus:outline-none focus:border-b-2 transition-colors",
                errors.email ? "border-danger focus:border-danger" : "border-outline focus:border-primary"
              )}
            />
            {errors.email && <span className="text-danger text-sm">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="zip" className="text-label">ZIP CODE / CITY <span className="text-on-surface-muted normal-case font-normal ml-2">(Qualifies your service area)</span></label>
            <input
              id="zip"
              type="text"
              {...register('zip')}
              className={cn(
                "bg-surface-container-lowest border-b py-2 focus:outline-none focus:border-b-2 transition-colors mono-md",
                errors.zip ? "border-danger focus:border-danger" : "border-outline focus:border-primary"
              )}
            />
            {errors.zip && <span className="text-danger text-sm">{errors.zip.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="jobType" className="text-label">JOB TYPE</label>
            <select
              id="jobType"
              {...register('jobType')}
              className={cn(
                "bg-surface-container-lowest border-b py-2 focus:outline-none focus:border-b-2 transition-colors appearance-none",
                errors.jobType ? "border-danger focus:border-danger" : "border-outline focus:border-primary"
              )}
            >
              <option value="">Select...</option>
              <option value="repair">Repair</option>
              <option value="trailer">Trailer repair</option>
              <option value="truck">Truck/vehicle</option>
              <option value="equipment">Equipment repair</option>
              <option value="gate">Gate/railing/fence</option>
              <option value="brackets">Brackets/mounts</option>
              <option value="fabrication">Custom fabrication</option>
              <option value="other">Other</option>
            </select>
            {errors.jobType && <span className="text-danger text-sm">{errors.jobType.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="material" className="text-label">MATERIAL</label>
            <select
              id="material"
              {...register('material')}
              className="bg-surface-container-lowest border-b border-outline focus:border-primary py-2 focus:outline-none focus:border-b-2 transition-colors appearance-none"
            >
              <option value="">Select...</option>
              <option value="steel">Steel</option>
              <option value="aluminum">Aluminum</option>
              <option value="stainless">Stainless</option>
              <option value="unsure">Not sure</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="urgency" className="text-label">URGENCY</label>
            <select
              id="urgency"
              {...register('urgency')}
              className={cn(
                "bg-surface-container-lowest border-b py-2 focus:outline-none focus:border-b-2 transition-colors appearance-none",
                errors.urgency ? "border-danger focus:border-danger" : "border-outline focus:border-primary"
              )}
            >
              <option value="">Select...</option>
              <option value="emergency">Emergency</option>
              <option value="this-week">This week</option>
              <option value="this-month">This month</option>
              <option value="flexible">Flexible / Planning ahead</option>
            </select>
            {errors.urgency && <span className="text-danger text-sm">{errors.urgency.message}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-label">DESCRIBE THE JOB</label>
          <textarea
            id="description"
            rows={4}
            placeholder="Detail the dimensions, accessibility, and current condition..."
            {...register('description')}
            className={cn(
              "bg-surface-container-lowest border-b py-2 focus:outline-none focus:border-b-2 transition-colors resize-y",
              errors.description ? "border-danger focus:border-danger" : "border-outline focus:border-primary"
            )}
          />
          {errors.description && <span className="text-danger text-sm">{errors.description.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-label">JOB SITE PHOTOS</label>
          <div className="border-2 border-dashed border-outline-variant bg-surface-container-low p-8 text-center rounded-sm hover:border-primary transition-colors cursor-pointer">
            <div className="w-12 h-12 mx-auto bg-surface-container-highest rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <p className="font-sans font-semibold text-on-background mb-1">Drop photos or tap to add</p>
            <p className="text-label text-on-surface-muted">SUPPORT: JPG, PNG, MAX 10MB</p>
            <input type="file" multiple accept="image/jpeg,image/png" className="hidden" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-4 pt-6 border-t border-outline-variant/30">
          <div className="text-center md:text-left">
            <p className="font-sans font-semibold text-on-background">FREE. NO OBLIGATION.</p>
            <p className="body-sm text-on-surface-variant">No pushy sales. Just professional advice.</p>
          </div>
          <Button type="submit" disabled={status === 'submitting'} className="w-full md:w-auto">
            {status === 'submitting' ? 'SENDING...' : 'SEND QUOTE REQUEST'}
          </Button>
        </div>
      </form>
    </div>
  );
}
