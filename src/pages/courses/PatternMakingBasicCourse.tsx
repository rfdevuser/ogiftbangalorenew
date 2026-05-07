import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, Scissors, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const PatternMakingBasicCourse = () => {
  const topics = [
    {
      title: 'Basic Bodice Block',
      description: 'Learn to draft the fundamental bodice block pattern, the foundation of garment construction.'
    },
    {
      title: 'Basic Kurta',
      description: 'Master the pattern making for traditional kurta designs with proper measurements and fit.'
    },
    {
      title: 'Skirt',
      description: 'Create basic skirt patterns with proper waist fitting and hemline techniques.'
    },
    {
      title: 'Circular Skirt',
      description: 'Learn the geometry and drafting of full circular skirt patterns.'
    },
    {
      title: 'A-Line Frock',
      description: 'Draft A-line frock patterns with proper flare and proportions.'
    },
    {
      title: 'Gather Skirt',
      description: 'Master patterns for gathered skirts with proper fullness calculations.'
    },
    {
      title: 'Basic Pant',
      description: 'Learn fundamental trouser pattern drafting with proper crotch and leg shaping.'
    },
    {
      title: 'Plain Blouse',
      description: 'Create basic blouse patterns with proper dart placement and fit.'
    },
    {
      title: 'Basic Yoke',
      description: 'Master yoke construction patterns for various garment applications.'
    }
  ];

  const highlights = [
    'Creative Design',
    'Pattern Making',
    'Pattern Visualization',
    'Basics of Pattern Development'
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Pattern Making Basic Course",
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
      "price": "23400",
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
        <title>Best Pattern Making Course Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="title" content="Best Pattern Making Course Bangalore 2026 | Onati Global Institute of Fashion Technology" />
        <meta name="description" content="Best pattern making course in Bangalore at OGIFT — bodice block, kurta, skirts, trousers & blouse. 1-month, 9 patterns covered. 4.9★ rated. 100% placement support. Admissions 2026 open!" />
        <meta name="keywords" content="best pattern making course bangalore, pattern making course bangalore 2026, bodice block pattern course, kurta pattern making bangalore, skirt pattern course bangalore, trouser pattern making, OGIFT, Onati Global, express mastery course bangalore, pattern drafting course, fashion course admissions 2026" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/pattern-making-basic" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/pattern-making-basic" />
        <meta property="og:title" content="Pattern Making Basic Course | OGIFT Bangalore" />
        <meta property="og:description" content="1-month basic pattern making course at OGIFT Bangalore. Learn 9 essential patterns — bodice, kurta, skirts, trousers and blouse. Certificate included." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/pattern-making-basic" />
        <meta name="twitter:title" content="Pattern Making Basic Course | OGIFT Bangalore" />
        <meta name="twitter:description" content="1-month basic pattern making at OGIFT Bangalore. 9 pattern types: bodice, kurta, skirts, trousers & blouse. Certificate included." />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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
              Pattern Making (Basic)
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Dive into the fascinating world of Pattern Creation and Development. Master the fundamentals of pattern drafting for essential garments.
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
              Build a solid foundation in pattern making techniques
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <Scissors className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold">{highlight}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About This Course */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About This Course</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Pattern making is the technical backbone of garment construction. A well-drafted pattern is the difference between a garment that fits beautifully and one that does not — and this skill is in demand across boutiques, fashion houses, and garment manufacturing units throughout India. OGIFT's 1-month Pattern Making Basic course in Bangalore introduces you to the science and art of pattern drafting, covering 9 essential garment types that form the foundation of any fashion designer's skill set.</p>
              <p>The course follows a hands-on, practical approach under experienced faculty. You will learn to take accurate body measurements, calculate ease allowances, and draft patterns on paper from scratch — without relying on pre-existing templates. Topics range from the fundamental bodice block to kurta, skirts (straight, circular, and A-line), frocks, trousers, blouses, and yoke patterns. Each pattern type is taught with attention to fit, proportion, and the practical considerations of garment construction. Classes are available in English, Hindi, and Kannada both online and offline.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Is This Course For?</h3>
              <p>This course suits beginners with no prior pattern making experience, home tailors looking to formalise their skills, fashion students who need a strong technical foundation, and working professionals seeking to add garment construction capability. It is the ideal starting point before progressing to the blouses advanced, western advanced, or kids clothing pattern making courses at OGIFT. Eligibility is Class 10 (SSC) and above.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Career Outcomes</h3>
              <p>Pattern makers are sought after in garment export units, fashion design studios, boutiques, and costume production companies. With a strong foundation in pattern drafting, graduates pursue careers as production pattern makers, boutique owners, tailoring instructors, and garment quality supervisors. OGIFT's 100% placement support connects graduates with opportunities at fashion brands and garment manufacturers across Bangalore and beyond.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Topics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master 9 essential pattern types in one comprehensive month
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
                    <Ruler className="h-6 w-6 text-primary" />
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
                  'Draft accurate bodice and garment blocks from scratch',
                  'Create patterns for both Western and Indian wear',
                  'Understand body measurements and ease allowances',
                  'Master skirt variations from straight to circular',
                  'Develop trouser patterns with proper fitting',
                  'Apply pattern making principles to any garment type'
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
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Patterns Covered</span>
                  <span className="font-semibold">9 Types</span>
                </div>
                {/* <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="font-semibold text-primary">Call Institute for Details</span>
                </div> */}
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Total Fees</span>
                  <span className="font-semibold">₹36,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Fashup Discount (10 Hours Free)</span>
                  <span className="font-semibold text-red-600">- ₹12,600</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">To Pay</span>
                  <span className="font-semibold text-primary text-lg">₹23,400</span>
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
          <h2 className="text-2xl font-bold mb-6 text-center">Related Pattern Making Courses at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link to="/courses/pattern-making-blouses-advanced" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Blouses Pattern Making</span></Link>
            <Link to="/courses/pattern-making-western-advanced" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Western Pattern Making</span></Link>
            <Link to="/courses/pattern-making-kids-clothing" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Kids Clothing Patterns</span></Link>
            <Link to="/courses/design-process-pattern-making-3months" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Design Process & Pattern Making</span></Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Scissors className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Start Your Pattern Making Journey</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our Express Mastery Month program and learn to create patterns for 9 essential garment types
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/Admissions">Enroll Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/about">Learn About OGIFT</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
      </>
  );
};

export default PatternMakingBasicCourse;
