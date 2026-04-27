import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object;
}

export function SeoHead({ 
  title, 
  description, 
  canonical = 'https://exactwelds.com', 
  ogImage,
  jsonLd 
}: SeoHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="mobile welding service, welder near me, Toledo welding, structural repair, fabrication, Northwest Ohio, Maumee welding, Perrysburg mobile welder, agricultural equipment repair, trailer welding repair, stainless steel welding Toledo, aluminum welding services, fix broken metal, welding repair, mobile welder, welding service near me, welders for hire, metal repair service" />
      
      <link rel="canonical" href={canonical} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:url" content={canonical} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
