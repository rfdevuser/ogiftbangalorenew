import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, Scissors, Palette, PenTool, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const DesignProcessPatternMaking3MonthsCourse = () => {
  const designProcess = {
    introduction: [
      'Definition of Fashion Designing',
      'Types of Fashion Designing / Collection Ranges',
      'Fashion Terminologies',
      'Design Concept Research',
      'Mood, Theme & Storyboard',
      'History of Fashion'
    ],
    fundamentals: {
      elements: ['Line', 'Shape', 'Dots', 'Colors Theory'],
      principles: ['Balance', 'Proportion', 'Emphasis', 'Harmony'],
      sketching: ['Basic Drawing Practice', 'Hatching & Cross Hatching', 'Stippling & Scribbling', 'Shading (Highlight, Shadow, Mid Tone)'],
      illustration: ['Mechanical Croqui', '9 Head Croqui', 'Flat Sketch - Women & Men', 'Fabric Rendering']
    },
    textileScience: ['Fibre, Yarn & Fabric', 'Types of Fibre', 'Types of Yarns', 'Types of Fabric', 'Fabric Finish']
  };

  const patternMakingTopics = {
    womensWear: {
      blouse: ['Plain Blouse', 'Princess Cut Blouse', 'Collar Blouse with Puff Sleeve', 'Designer Blouse'],
      kurta: ['Plain Kurta', 'Princess Cut Kurta', 'Collar Kurta', 'Alia Cut Kurta'],
      pajama: ['Plain Pajama', 'Semi Patiyal', 'Trouser Style', 'Chudidar'],
      gown: ['Simple Gown', 'Yoke with Umbrella Style Gown']
    },
    kidsWear: ['Jabla', 'Umbrella Frock', 'Gathered Frock', 'A-Line Frock', 'Gathered Skirt', 'Pleated Skirt'],
    mensWear: ['Kurta', 'Pajama', 'Shirt', 'Trouser']
  };

  const garmentConstruction = [
    'Operating Sewing Machine',
    'Body Measurement',
    'Knowledge About Fabric Type & Consumption',
    'Basic Hand Stitches (Basting, Running, Chain, Tacking, Buttonhole, Hemming)',
    'Seam Types & Finishes (Plain, Flat Fell, French, Lapped)',
    'Basic Bodice Technique',
    'Different Types of Tucks',
    'Different Types of Pleats',
    'Different Neck Finishes',
    'Different Sleeve Types',
    'How to Attach Zipper'
  ];

  const highlights = [
    'Design Process',
    'Fashion Illustration',
    'Pattern Making',
    'Garment Construction'
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Design Process & Pattern Making (DPPM)",
    "description": "A comprehensive 3-month program combining design fundamentals, fashion illustration, textile science, and pattern making at OGIFT Bangalore.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Onati Global Institute of Fashion Technology",
      "alternateName": "OGIFT Bangalore",
      "url": "https://www.ogiftbangalore.com"
    },
    "timeRequired": "P3M",
    "numberOfCredits": "107",
    "educationalLevel": "Beginner to Intermediate",
    "inLanguage": ["en", "hi", "kn"],
    "offers": {
      "@type": "Offer",
      "price": "43200",
      "priceCurrency": "INR",
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
        <title>Best Fashion Design & Pattern Making Course Bangalore 2026 | OGIFT | DPPM</title>
        <meta name="title" content="Best Design Process & Pattern Making 3 Months Course Bangalore 2026 | Onati Global Institute" />
        <meta name="description" content="Best fashion design & pattern making 3-month course (DPPM) in Bangalore at OGIFT — design fundamentals, illustration, textile science. 107 hours. 4.9★ rated. 100% placement. Admissions 2026 open!" />
        <meta name="keywords" content="best fashion design pattern making course bangalore, DPPM course bangalore 2026, design process pattern making bangalore, fashion illustration course bangalore, textile science course, OGIFT, Onati Global, 3 month fashion diploma bangalore, fashion certificate 2026, admissions open" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/design-process-pattern-making-3months" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/design-process-pattern-making-3months" />
        <meta property="og:title" content="Design Process & Pattern Making 3 Months Course | OGIFT Bangalore" />
        <meta property="og:description" content="3-month DPPM course covering fashion design fundamentals, illustration, textile science and pattern making. 107 hours, certificate included at OGIFT Bangalore." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/design-process-pattern-making-3months" />
        <meta name="twitter:title" content="Design Process & Pattern Making 3 Months Course | OGIFT Bangalore" />
        <meta name="twitter:description" content="3-month DPPM course: design fundamentals, fashion illustration, textile science & pattern making. 107 hours, certificate included at OGIFT Bangalore." />

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
              3 Months Capsule Course
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Design Process & Pattern Making (DPPM)
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A comprehensive program combining design fundamentals, fashion illustration, textile science, and pattern making. Master the complete design-to-construction process.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>3 Months Duration (107 Hours)</span>
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
              Complete training from design concepts to garment construction
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                {index === 0 && <Palette className="h-10 w-10 mx-auto mb-4 text-primary" />}
                {index === 1 && <PenTool className="h-10 w-10 mx-auto mb-4 text-primary" />}
                {index === 2 && <Scissors className="h-10 w-10 mx-auto mb-4 text-primary" />}
                {index === 3 && <Layers className="h-10 w-10 mx-auto mb-4 text-primary" />}
                <h3 className="font-semibold">{highlight}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Design Process Curriculum</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn the fundamentals of fashion design and illustration
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Introduction to Fashion */}
            <Card className="p-6 border-2 hover:border-primary transition-colors">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Introduction to Fashion
              </h3>
              <ul className="space-y-2">
                {designProcess.introduction.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Textile Science */}
            <Card className="p-6 border-2 hover:border-primary transition-colors">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Textile Science & Fabric Identification
              </h3>
              <ul className="space-y-2">
                {designProcess.textileScience.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Fundamentals Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 border-2 hover:border-primary transition-colors">
              <h4 className="font-bold mb-3 text-primary">Elements of Design</h4>
              <ul className="space-y-1">
                {designProcess.fundamentals.elements.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 border-2 hover:border-primary transition-colors">
              <h4 className="font-bold mb-3 text-primary">Principles of Design</h4>
              <ul className="space-y-1">
                {designProcess.fundamentals.principles.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 border-2 hover:border-primary transition-colors">
              <h4 className="font-bold mb-3 text-primary">Sketching Techniques</h4>
              <ul className="space-y-1">
                {designProcess.fundamentals.sketching.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-6 border-2 hover:border-primary transition-colors">
              <h4 className="font-bold mb-3 text-primary">Fashion Illustration</h4>
              <ul className="space-y-1">
                {designProcess.fundamentals.illustration.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Pattern Making Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pattern Making Curriculum</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive pattern making for women's, kids', and men's wear
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Women's Wear */}
            <Card className="p-6 border-2 hover:border-primary transition-colors">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Scissors className="h-5 w-5 text-primary" />
                Women's Wear
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-primary mb-2">Blouse</h4>
                  <ul className="space-y-1">
                    {patternMakingTopics.womensWear.blouse.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-primary mb-2">Kurta</h4>
                  <ul className="space-y-1">
                    {patternMakingTopics.womensWear.kurta.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-primary mb-2">Pajama</h4>
                  <ul className="space-y-1">
                    {patternMakingTopics.womensWear.pajama.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-primary mb-2">Gown</h4>
                  <ul className="space-y-1">
                    {patternMakingTopics.womensWear.gown.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Kids' Wear */}
            <Card className="p-6 border-2 hover:border-primary transition-colors">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Scissors className="h-5 w-5 text-primary" />
                Kids' Wear
              </h3>
              <ul className="space-y-2">
                {patternMakingTopics.kidsWear.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Men's Wear */}
            <Card className="p-6 border-2 hover:border-primary transition-colors">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Scissors className="h-5 w-5 text-primary" />
                Men's Wear
              </h3>
              <ul className="space-y-2">
                {patternMakingTopics.mensWear.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Garment Construction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Garment Construction</h2>
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {garmentConstruction.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Course Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">3 Months</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Total Hours</span>
                  <span className="font-semibold">107 Hours</span>
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
                  <span className="font-semibold">Offline (In-Person)</span>
                </div>
                {/* <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="font-semibold text-primary">Call Institute for Details</span>
                </div> */}

               <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Total Fees</span>
                  <span className="font-semibold">₹86,400</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Fashup Discount (10 Hours Free)</span>
                  <span className="font-semibold text-red-600">- ₹43,200</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">To Pay</span>
                  <span className="font-semibold text-primary text-lg">₹43,200</span>
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <PenTool className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Master Design & Pattern Making</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our 3-month DPPM program and learn the complete journey from design concepts to finished garments
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

export default DesignProcessPatternMaking3MonthsCourse;
