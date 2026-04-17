import React from 'react';
import { Helmet } from 'react-helmet-async';
import defaultOg from '../../assets/gallery/welding-hero.jpg';

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
  const finalOgImage = ogImage || `https://exactwelds.com${defaultOg}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <link rel="canonical" href={canonical} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={canonical} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
