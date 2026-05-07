import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, Layers, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const FabricKnowledgeTextileDesigningCourse = () => {
  const topics = [
    {
      title: 'Introduction to Textile Fibers',
      description: 'Learn about natural and man-made fibers, their properties, and applications in fashion.'
    },
    {
      title: 'Types of Yarn',
      description: 'Understand different yarn types, their characteristics, and how they affect fabric properties.'
    },
    {
      title: 'Types of Fabrics',
      description: 'Explore various fabric types, weaves, and their suitability for different garments.'
    },
    {
      title: 'Fabric Finishing',
      description: 'Learn about finishing techniques that enhance fabric appearance and performance.'
    }
  ];

  const highlights = [
    'Fiber to Fabric',
    'Weaving & Knitting Structures',
    'CAD Textile Design',
    'Printing & Finishing'
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Fabric Knowledge & Textile Designing",
    "description": "A 1-month course focused on the material science of textiles and creative processes in designing and producing fabrics at OGIFT Bangalore.",
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
      "availability": "https://schema.org/InStock"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "offline",
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
        <title>Best Fabric & Textile Designing Course Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="title" content="Best Fabric Knowledge & Textile Designing Course Bangalore 2026 | Onati Global Institute" />
        <meta name="description" content="Best textile designing course in Bangalore at OGIFT — textile science, fiber types, yarn construction & fabric finishing. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!" />
        <meta name="keywords" content="best textile designing course bangalore, fabric knowledge course bangalore 2026, textile science course bangalore, fabric finishing course, fiber yarn fabric course, OGIFT, Onati Global, textile course bangalore, express mastery course, textile design admissions 2026, fashion technology bangalore" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/fabric-knowledge-textile-designing" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/fabric-knowledge-textile-designing" />
        <meta property="og:title" content="Fabric Knowledge & Textile Designing Course | OGIFT Bangalore" />
        <meta property="og:description" content="1-month textile science course at OGIFT Bangalore. Learn fibers, yarn, fabric types and textile designing. Certificate included." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/fabric-knowledge-textile-designing" />
        <meta name="twitter:title" content="Fabric Knowledge & Textile Designing Course | OGIFT Bangalore" />
        <meta name="twitter:description" content="1-month textile science & designing course at OGIFT Bangalore. Fibers, yarn, fabric types and finishing. Certificate included." />

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
              Fabric Knowledge & Textile Designing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              This course focuses on the material science of textiles and the creative processes involved in designing and producing fabrics.
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
              <Button size="lg" asChild>
                <Link to="/Admissions">Enroll Now</Link>
              </Button>
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
              Understand the science and art of textiles
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <Layers className="h-10 w-10 mx-auto mb-4 text-primary" />
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
              Comprehensive knowledge of textiles from fiber to finished fabric
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {topics.map((topic, index) => (
              <Card 
                key={index} 
                className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{topic.title}</h3>
                    <p className="text-muted-foreground">{topic.description}</p>
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
                  'Identify and classify natural and synthetic fibers',
                  'Understand yarn construction and properties',
                  'Recognize different fabric types and their applications',
                  'Apply fabric finishing knowledge to design decisions',
                  'Select appropriate fabrics for specific garment types',
                  'Evaluate fabric quality and performance characteristics'
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
                  <span className="font-semibold">In-Person</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="font-semibold text-primary">Call Institute for Details</span>
                </div>
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
              <p>The Fabric Knowledge &amp; Textile Designing course at OGIFT Bangalore is a 1-month Express Mastery programme that gives students a deep, practical understanding of fabric — the primary material of every fashion design. Knowing how fabric behaves is essential for every fashion professional: designers choose fabrics that will realise their vision, pattern makers account for fabric properties in their drafts, and buyers and merchandisers evaluate fabric quality when sourcing for collections. This course teaches you to identify, evaluate, and select fabric with the confidence of an industry professional.</p>
              <p>The course covers the full spectrum of textile knowledge: natural, synthetic, and blended fibre types; weave structures, knit constructions, and non-woven fabrics; dyeing, printing, and finishing processes that affect fabric performance and hand feel; and the fundamentals of textile design including print creation, surface pattern development, and colour application. Students work with real fabric samples from OGIFT's textile library, learning to evaluate fabric through both visual examination and physical testing. Faculty with textile industry experience guide students through the practical application of each topic.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Is This Course For?</h3>
              <p>This course is ideal for fashion design students who want to deepen their material knowledge, buyers and merchandisers who need to evaluate fabric quality, entrepreneurs sourcing fabrics for their collections, and anyone interested in textile design as a creative career. Eligibility is Class 10 (SSC) and above.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Career Outcomes</h3>
              <p>Graduates work as fabric buyers, textile designers, print designers, production merchandisers, quality controllers, and sourcing executives. The course also provides valuable foundational knowledge for students progressing to diploma programmes or specialising in surface ornamentation and embellishment. OGIFT's placement network connects graduates with textile companies, garment exporters, and fashion brands across India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Fabric Technology Tools and Courses at OGIFT</h2>
          <p className="text-muted-foreground leading-relaxed">
            Students of the Fabric Knowledge course often continue with the <Link to="/courses/draping-technology" className="text-primary underline hover:no-underline font-medium">Draping Technology course</Link>, which applies fabric knowledge in 3D pattern making and garment construction directly on dress forms. OGIFT also offers a free <Link to="/fabric-sim" className="text-primary underline hover:no-underline font-medium">Interactive 3D Fabric Simulation tool</Link> that lets students visualise how different fabrics drape, stretch, and respond to gravity before working with them in the studio — ideal for reinforcing what is learned in the fabric science curriculum.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Layers className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Master Fabric & Textile Knowledge</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our Express Mastery Month program and understand the science behind textiles
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
  );
    </>
  );
};

export default FabricKnowledgeTextileDesigningCourse;
