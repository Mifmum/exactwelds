import { NAP } from '../content/nap';
import { services } from '../content/services';
import { gallery } from '../content/gallery';
import { faqGroups } from '../content/faq';

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": NAP.name,
    "image": `https://exactwelds.com/gallery/hero.jpg`,
    "telephone": NAP.phoneE164,
    "email": NAP.email,
    "url": "https://exactwelds.com",
    "areaServed": NAP.cities.map(city => ({
      "@type": "City",
      "name": city,
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    })),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toledo",
      "addressRegion": "OH",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6528,
      "longitude": -83.5379
    },
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      NAP.social.facebook
    ]
  };
}

export function generateServicesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": services.map(service => ({
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "LocalBusiness",
        "name": NAP.name
      }
    }))
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Zack Miller",
    "jobTitle": "Owner & Lead Welder",
    "worksFor": {
      "@type": "LocalBusiness",
      "name": NAP.name
    }
  };
}

export function generateFaqSchema() {
  const allFaqs = faqGroups.flatMap(group => group.items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateWorkSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": gallery.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.descriptor
      }
    }))
  };
}
