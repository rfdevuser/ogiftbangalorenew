import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, Scissors, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const ArtOfGarmentFoundationCourse = () => {
  const topics = [
    {
      title: 'Development of Samples Using Sewing Techniques',
      description: 'Learn to create professional garment samples using various sewing techniques and methods.'
    },
    {
      title: 'Basic Hand Stitches',
      description: 'Master essential hand stitches including basting, running, chain, tacking, and hand overcast techniques.'
    },
    {
      title: 'Body Measurements',
      description: 'Learn accurate body measurement techniques essential for proper garment fitting.'
    },
    {
      title: 'Sleeves & Garment Finishing',
      description: 'Master sleeve construction and professional garment finishing techniques.'
    },
    {
      title: 'Collar, Placket, Pocket',
      description: 'Learn to construct collars, plackets, and pockets with professional precision.'
    },
    {
      title: 'Pattern Creation & Garment Finishing',
      description: 'Create patterns and apply professional finishing techniques to completed garments.'
    }
  ];

  const highlights = [
    'Pattern Making & Grading',
    'Fabric Science',
    'Sewing Techniques',
    'Fit & Alterations'
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Art of Garment Foundation",
    "description": "Learn the basics of essential skills and technical knowledge needed to construct, fit, and finish clothing professionally.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Onati Global Institute of Fashion Technology",
      "alternateName": "OGIFT Bangalore",
      "url": "https://www.ogiftbangalore.com"
    },
    "timeRequired": "P1M",
    "educationalLevel": "Beginner",
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
        <title>Best Garment Construction Course Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="title" content="Art of Garment Foundation Course Bangalore 2026 | Onati Global Institute of Fashion Technology" />
        <meta name="description" content="Best garment construction course in Bangalore at OGIFT — sewing techniques, pattern making & professional finishing in 1-month Express Mastery. 4.9★ rated. 100% placement support. Admissions 2026 open!" />
        <meta name="keywords" content="best garment construction course bangalore, art of garment foundation bangalore, sewing course bangalore, pattern making course bangalore, garment finishing course, fashion design course bangalore 2026, OGIFT, Onati Global, express mastery course, garment technology bangalore, admissions 2026 fashion" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/art-of-garment-foundation" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/art-of-garment-foundation" />
        <meta property="og:title" content="Art of Garment Foundation Course | OGIFT Bangalore" />
        <meta property="og:description" content="Master garment construction in 1 month. Learn sewing, pattern making, and professional finishing at Bangalore's premier fashion institute. Certificate included." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/art-of-garment-foundation" />
        <meta name="twitter:title" content="Art of Garment Foundation Course | OGIFT Bangalore" />
        <meta name="twitter:description" content="Master garment construction in 1 month at OGIFT Bangalore. Sewing, pattern making & professional finishing. Certificate included." />

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
              Art of Garment Foundation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Learn the basics of essential skills and technical knowledge needed to construct, fit, and finish clothing professionally.
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
              Build a solid foundation in garment construction
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <Wrench className="h-10 w-10 mx-auto mb-4 text-primary" />
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
              Master the fundamental techniques of garment construction
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
                    <Scissors className="h-6 w-6 text-primary" />
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
                  'Execute professional hand stitching techniques',
                  'Take accurate body measurements for garment construction',
                  'Construct sleeves with proper ease and fit',
                  'Create collars, plackets, and pockets professionally',
                  'Apply professional garment finishing techniques',
                  'Develop complete garment samples from scratch'
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
                  <span className="font-semibold">Beginner</span>
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

      {/* About This Course */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About This Course</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>The Art of Garment Foundation course at OGIFT Bangalore is a 1-month Express Mastery programme that teaches the essential skills of garment construction — the practical, hands-on craft of sewing fabric into finished, wearable garments. Understanding garment construction is the foundation of any fashion career: whether you become a designer, a pattern maker, a boutique owner, or a production specialist, the ability to construct a garment accurately and efficiently is a skill that underpins everything else. This course gives you that foundation in an intensive, industry-focused format.</p>
              <p>The course covers the essential garment construction disciplines: seam types and stitching techniques, construction of bodices, skirts, sleeves, and closures, finishing methods including hemming, overlocking, and lining, and quality control at each stage of the garment-making process. Students work on professional-grade machines in OGIFT's sewing atelier, with faculty who have real garment industry experience guiding every session. The course is taught in English, Hindi, and Kannada, and is structured to give students immediately transferable skills they can apply to any garment type.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Is This Course For?</h3>
              <p>This course is suitable for beginners with no prior sewing experience as well as home stitchers and hobbyists who want to bring their skills up to professional standard. It is also an excellent foundation for students planning to progress to OGIFT's pattern making courses, diploma programmes, or boutique management course. Eligibility is Class 10 (SSC) and above.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Career Outcomes</h3>
              <p>Graduates work as garment construction specialists, sample room assistants, production line supervisors, tailoring unit managers, alterations specialists, and costume makers. The skills are also directly applicable to launching a home-based tailoring or bespoke garment business. OGIFT's 100% placement support helps graduates connect with employment opportunities across Bangalore and Karnataka.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Related Pages at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link to="/courses/pattern-making-blouses-advanced" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Advanced Blouse Patterns</span></Link>
            <Link to="/courses/pattern-making-western-advanced" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Advanced Western Patterns</span></Link>
            <Link to="/courses/pattern-making-kids-clothing" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Kids Clothing Patterns</span></Link>
            <Link to="/courses/design-process-pattern-making-3months" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">3-Month DPPM Course</span></Link>
            <Link to="/courses/pattern-making-basic" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Pattern Making Basic</span></Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Wrench className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Build Your Garment Foundation</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our Express Mastery Month program and master the essential skills of garment construction
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

export default ArtOfGarmentFoundationCourse;
