import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Onati Global Institute of Fashion Technology",
      "alternateName": "Onati Global",
      "url": "https://onatiglobal.com",
      "logo": "https://onatiglobal.com/logo.png",
      "description": "Premier fashion design institute in Bangalore offering professional courses in fashion technology, design, and styling with 100% placement support.",
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
