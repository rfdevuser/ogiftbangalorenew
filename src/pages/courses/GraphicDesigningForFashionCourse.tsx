import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, Palette, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const GraphicDesigningForFashionCourse = () => {
  const topics = [
    {
      title: 'Basic Tools',
      description: 'Learn the essential digital tools and software used in fashion graphic design.'
    },
    {
      title: 'Working with Pen Tool',
      description: 'Master the pen tool for precise vector illustrations and fashion drawings.'
    },
    {
      title: 'Draping Casual & Western Wear',
      description: 'Learn digital techniques for draping casual and western wear garments.'
    },
    {
      title: 'Digital Garment Draping',
      description: 'Master draping different garments using the pen tool and digital techniques.'
    },
    {
      title: 'Fashion Illustration with References',
      description: 'Create professional fashion illustrations using reference images.'
    },
    {
      title: 'Fabric Effects & Texture',
      description: 'Apply realistic fabric effects and textures to your digital designs.'
    }
  ];

  const highlights = [
    'Fashion Branding & Identity',
    'Layout & Collateral Design',
    'Digital Marketing Assets',
    'Software Proficiency'
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Graphic Designing for Fashion",
    "description": "A 1-month course applying core graphic design principles within the fashion industry — from digital fashion illustration and branding to marketing materials at OGIFT Bangalore.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Onati Global Institute of Fashion Technology",
      "alternateName": "OGIFT Bangalore",
      "url": "https://www.ogiftbangalore.com"
    },
    "timeRequired": "P1M",
    "educationalLevel": "Beginner to Intermediate",
    "inLanguage": ["en", "hi", "kn"],
    "offers": {
      "@type": "Offer",
      "price": "15600",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["online", "offline"],
      "location": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Best Graphic Design for Fashion Course Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="title" content="Best Graphic Designing for Fashion Course Bangalore 2026 | Onati Global Institute of Fashion Technology" />
        <meta name="description" content="Best graphic design for fashion course in Bangalore at OGIFT — digital illustration, pen tool, fabric effects & fashion branding. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!" />
        <meta name="keywords" content="best graphic design fashion course bangalore, digital fashion illustration course bangalore 2026, fashion branding course bangalore, pen tool fashion design, fabric texture digital, OGIFT, Onati Global, express mastery course, graphic design fashion admissions 2026, fashion technology bangalore" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/graphic-designing-for-fashion" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/graphic-designing-for-fashion" />
        <meta property="og:title" content="Graphic Designing for Fashion Course | OGIFT Bangalore" />
        <meta property="og:description" content="1-month graphic design for fashion course at OGIFT Bangalore. Digital illustration, pen tool, fabric effects and fashion branding. Certificate included." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/graphic-designing-for-fashion" />
        <meta name="twitter:title" content="Graphic Designing for Fashion Course | OGIFT Bangalore" />
        <meta name="twitter:description" content="1-month graphic design for fashion course at OGIFT Bangalore. Digital illustration, pen tool, fabric effects & branding. Certificate included." />

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
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
              Express Mastery Month
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Graphic Designing for Fashion
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              This course focuses on applying core graphic design principles specifically within the fashion industry context, from branding to marketing materials.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>1 Month Duration</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-primary" />
                <span>Certificate Included</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* <Button size="lg" asChild>
                <Link to="/Admissions">Enroll Now</Link>
              </Button> */}
              <Button size="lg" variant="outline" asChild>
                <Link to="/courses">View All Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Highlights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Master digital design tools for the fashion industry
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <Monitor className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold">{highlight}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Topics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From basic tools to advanced digital fashion illustration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {topics.map((topic, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                    <p className="text-muted-foreground text-sm">{topic.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details & Skills */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Skills You'll Develop</h2>
              <ul className="space-y-4">
                {[
                  'Master essential graphic design software tools',
                  'Create precise fashion illustrations using pen tool',
                  'Apply digital draping techniques for various garments',
                  'Develop fashion illustrations from reference images',
                  'Add realistic fabric effects and textures',
                  'Create professional fashion marketing materials'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">Course Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">1 Month</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-semibold">Beginner to Intermediate</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Certificate</span>
                  <span className="font-semibold">Yes</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Mode</span>
                  <span className="font-semibold">Online & Offline</span>
                </div>
                {/* <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="font-semibold text-primary">Call Institute for Details</span>
                </div> */}
               <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Total Fees</span>
                  <span className="font-semibold">₹24,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Fashup Discount (10 Hours Free)</span>
                  <span className="font-semibold text-red-600">- ₹8,400</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">To Pay</span>
                  <span className="font-semibold text-primary text-lg">₹15,600</span>
                </div>
              </div>
              <div className="mt-6">
                <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                  <Link to="/Admissions">Enroll Now</Link>
                </Button>
              
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Related Courses at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            <Link to="/courses/fashion-illustration" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fashion Illustration</span></Link>
            <Link to="/courses/draping-technology" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Draping Technology</span></Link>
            <Link to="/courses/fashion-styling" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fashion Styling</span></Link>
            <Link to="/courses/art-of-garment-foundation" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Garment Foundation</span></Link>
            <Link to="/courses/fabric-knowledge-textile-designing" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fabric & Textile</span></Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Monitor className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Master Digital Fashion Design</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our Express Mastery Month program and learn graphic design for the fashion industry
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button size="lg" variant="secondary" asChild>
                <Link to="/Admissions">Enroll Now</Link>
              </Button> */}
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/about">Learn About OGIFT</Link>
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

export default GraphicDesigningForFashionCourse;
