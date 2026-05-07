import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "name": "Onati Global Institute of Fashion Technology",
      "alternateName": ["OGIFT", "Onati Global", "OGIFT Bangalore"],
      "url": "https://www.ogiftbangalore.com",
      "logo": "https://www.ogiftbangalore.com/og-image.jpg",
      "image": "https://www.ogiftbangalore.com/og-image.jpg",
      "description": "Rated 4.9★ — Bangalore's best fashion design institute offering professional courses in fashion technology, design, pattern making, and styling with 100% placement support. Admissions 2026 open.",
      "priceRange": "₹₹",
      "openingHours": "Mo-Sa 09:00-18:00",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No 4 5th Main 1st Cross B Block, 4th Main Vinayakanagar",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560017",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-90369-28799",
        "contactType": "Admissions",
        "email": "admissions@ogiftbangalore.com",
        "availableLanguage": ["English", "Hindi", "Kannada"]
      },
      "sameAs": [
        "https://www.facebook.com/onatiglobal",
        "https://www.instagram.com/onatiglobal",
        "https://www.linkedin.com/company/onatiglobal",
        "https://www.youtube.com/onatiglobal"
      ],
      "foundingDate": "2010",
      "areaServed": {
        "@type": "City",
        "name": "Bangalore"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "250"
      }
    });
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default StructuredData;
