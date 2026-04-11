import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Award, Users } from 'lucide-react';
import heroImage from '@/assets/hero-courses.jpg';
import { Link } from 'react-router-dom';
import { courseCategories } from '@/data/courseCategories';

const Courses = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Onati Global Institute of Fashion Technology",
    "alternateName": "OGIFT Bangalore",
    "description": "Industry-recognized fashion design programs designed to transform your creative vision into professional expertise. Courses in garment construction, pattern making, design process and more.",
    "url": "https://www.ogiftbangalore.com",
    "logo": "https://www.ogiftbangalore.com/logo.png",
    "sameAs": [
      "https://www.instagram.com/ogiftbangalore",
      "https://www.facebook.com/ogiftbangalore"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-90369-28799",
      "contactType": "admissions",
      "availableLanguage": ["English", "Hindi", "Kannada"]
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Fashion Design Courses in Bangalore 2026 | OGIFT | Best Fashion Institute</title>
        <meta name="title" content="Fashion Design Courses in Bangalore 2026 | Onati Global Institute of Fashion Technology" />
        <meta name="description" content="Explore Bangalore's best fashion design courses at OGIFT. Admissions 2026 open — pattern making, garment construction, fashion illustration, boutique management, styling & advanced diplomas. 100% placement assistance." />
        <meta name="keywords" content="fashion design courses bangalore 2026, best fashion design courses bangalore, fashion designing courses bangalore, pattern making course bangalore, garment construction course bangalore, fashion illustration course, boutique management course, fashion diploma bangalore, fashion styling course, OGIFT courses, Onati Global Institute, fashion design certificate bangalore, fashion career bangalore, admissions 2026 fashion, 100% placement fashion institute" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses" />
        <meta property="og:title" content="Fashion Design Courses in Bangalore 2026 | OGIFT | Best Fashion Institute" />
        <meta property="og:description" content="Explore Bangalore's best fashion design courses at OGIFT — pattern making, garment construction, fashion illustration, boutique management, styling & advanced diplomas. 100% placement. Admissions 2026 open!" />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses" />
        <meta name="twitter:title" content="Fashion Design Courses Bangalore 2026 | OGIFT | 100% Placement" />
        <meta name="twitter:description" content="Bangalore's best fashion design courses — pattern making, garment construction, styling & advanced diplomas. 100% placement. Admissions 2026 open!" />

        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-background/60 to-background/40" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Fashion Design Courses
            </h1>
         
            <p className="text-xl">
              Industry-recognized programs designed to transform your creative vision into professional expertise
            </p>
          </div>
        </div>
      </section>

      {/* Category Selection */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select a category that best describes you to find the perfect courses tailored for your goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link 
                  key={category.id} 
                  to={`/courses/category/${category.id}`}
                  className="group"
                >
                  <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary bg-card group-hover:scale-[1.02]">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white mb-6`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-primary font-medium mb-4">{category.subtitle}</p>
                    <p className="text-muted-foreground mb-6">{category.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        {category.courses.length} courses available
                      </span>
                      <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Explore →
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Our Courses Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Courses?</h2>
            <p className="text-xl text-muted-foreground">Industry-aligned curriculum with hands-on experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'Expert Faculty', description: 'Learn from industry professionals with years of experience' },
              { icon: Users, title: 'Small Batches', description: 'Personalized attention with limited students per class' },
              { icon: Award, title: 'Certifications', description: 'Industry-recognized diplomas and certificates' },
              { icon: Clock, title: 'Flexible Timings', description: 'Weekend and evening batches available' },
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4">Ready to Enroll?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Start your fashion career with India's leading fashion technology institute in Bangalore
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
    </>
  );
};

export default Courses;
