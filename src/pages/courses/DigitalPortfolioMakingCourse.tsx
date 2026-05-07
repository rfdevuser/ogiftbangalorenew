import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, FileImage, Palette, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const DigitalPortfolioMakingCourse = () => {
  const topics = [
    {
      title: 'Individual Portfolio Presentation',
      description: 'Create a comprehensive portfolio presentation based on a unique theme of your choice.'
    },
    {
      title: 'Story Board Development',
      description: 'Learn to create compelling story boards that communicate your design narrative.'
    },
    {
      title: 'Mood Board & Colour Board',
      description: 'Develop professional mood boards and colour boards to establish design direction.'
    },
    {
      title: 'Texture Board & Swatch Board',
      description: 'Create texture and swatch boards showcasing fabric selections and material choices.'
    },
    {
      title: 'Logo Design',
      description: 'Design a personal or brand logo that represents your fashion identity.'
    },
    {
      title: 'Working Drawing - Spec Sheet & Cost Sheet',
      description: 'Create technical working drawings with detailed spec sheets and cost sheets.'
    },
    {
      title: 'Garment Development Methods',
      description: 'Develop garments using drafting, draping, and flat pattern methods for your portfolio.'
    }
  ];

  const highlights = [
    'Platform Selection & Structure',
    'Visual Presentation & Curation',
    'Content Strategy',
    'Digital Tools & Interactivity'
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Digital Portfolio Making",
    "description": "A 1-month course focused on strategically curating, designing, and presenting creative fashion work online to appeal to potential employers or clients at OGIFT Bangalore.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Onati Global Institute of Fashion Technology",
      "alternateName": "OGIFT Bangalore",
      "url": "https://www.ogiftbangalore.com"
    },
    "timeRequired": "P1M",
    "educationalLevel": "All Levels",
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
        {/* Primary Meta Tags */}
        <title>Best Fashion Portfolio Course Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="title" content="Best Digital Portfolio Making Course Bangalore 2026 | Onati Global Institute of Fashion Technology" />
        <meta name="description" content="Best fashion portfolio course in Bangalore at OGIFT — mood boards, storyboards, logo design, spec sheets & garment development. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!" />
        <meta name="keywords" content="best fashion portfolio course bangalore, digital portfolio making course bangalore 2026, fashion portfolio design bangalore, mood board course, fashion storyboard course, spec sheet course, OGIFT, Onati Global, express mastery course, fashion design portfolio admissions 2026" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/digital-portfolio-making" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/digital-portfolio-making" />
        <meta property="og:title" content="Digital Portfolio Making Course | OGIFT Bangalore" />
        <meta property="og:description" content="1-month digital portfolio course at OGIFT Bangalore. Create mood boards, story boards, logo design, spec sheets and a complete fashion portfolio. Certificate included." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/digital-portfolio-making" />
        <meta name="twitter:title" content="Digital Portfolio Making Course | OGIFT Bangalore" />
        <meta name="twitter:description" content="1-month fashion portfolio course at OGIFT Bangalore. Mood boards, story boards, spec sheets and complete portfolio development. Certificate included." />

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
              Digital Portfolio Making
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              This course will focus on strategically curating, designing, and presenting creative work online to appeal to potential employers or clients.
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
              Build a professional portfolio that showcases your talent
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <FileImage className="h-10 w-10 mx-auto mb-4 text-primary" />
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
            <h2 className="text-4xl font-bold mb-4">What You'll Create</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build a complete professional portfolio from concept to presentation
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
                    {index % 3 === 0 ? <Palette className="h-6 w-6 text-primary" /> : 
                     index % 3 === 1 ? <Layout className="h-6 w-6 text-primary" /> :
                     <FileImage className="h-6 w-6 text-primary" />}
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
                  'Create professional mood boards and story boards',
                  'Develop colour palettes and texture presentations',
                  'Design personal or brand logos',
                  'Create technical spec sheets and cost sheets',
                  'Present work effectively to employers and clients',
                  'Build a cohesive portfolio around a central theme'
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
                  <span className="font-semibold">All Levels</span>
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
                  <span className="text-muted-foreground">Outcome</span>
                  <span className="font-semibold">Complete Portfolio</span>
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

      {/* About This Course */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About This Course</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>The Digital Portfolio Making course at OGIFT Bangalore is a focused 1-month Express Mastery programme that teaches fashion students and graduates how to create a professional digital portfolio — the essential tool for securing employment, freelance clients, and admission to advanced design programmes. In today's fashion industry, a digital portfolio is your most important professional asset. Employers review portfolios before résumés; clients assess your work before making contact; and the quality of your portfolio presentation directly influences the opportunities available to you. This course teaches you to create a portfolio that opens doors.</p>
              <p>The course covers portfolio strategy and structure, digital layout and presentation tools, photography and image editing for garment and illustration work, writing design rationales and project descriptions, tailoring portfolio content for different employer types (fashion brands, garment exporters, boutiques, design studios), and building a professional online presence. Students work on their own actual design and project work throughout the course, so that by the end they have a completed, personalised portfolio ready for immediate use. Faculty with industry hiring experience provide direct feedback on portfolio quality and presentation.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Is This Course For?</h3>
              <p>This course is ideal for fashion design graduates preparing for job applications, students completing diploma programmes who need to present their work professionally, freelance designers and stylists who want to attract clients, and anyone who has developed fashion skills informally and now wants to formalise their presentation. Eligibility is Class 10 (SSC) and above.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Career Outcomes</h3>
              <p>Graduates emerge with a completed, professional digital portfolio that they can use for job applications, freelance client acquisition, and further study applications. The course accelerates the job search significantly — graduates report more interview invitations and stronger employer responses after completing the programme. OGIFT's 100% placement support further amplifies these outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Related Portfolio Resources at OGIFT</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Digital Portfolio Making course works alongside OGIFT's <Link to="/portfolio" className="text-primary underline hover:no-underline font-medium">AI Fashion Portfolio Builder</Link> — a free tool that provides AI-powered critique and recommendations for improving your portfolio's commercial effectiveness. Students who want a more comprehensive qualification combining design skills, pattern making, and portfolio development should consider the <Link to="/courses/design-pattern-making-portfolio-3months" className="text-primary underline hover:no-underline font-medium">Design, Pattern Making and Portfolio 3-month course (DPPMP)</Link>, which produces a complete employer-ready portfolio across three months of integrated study.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <FileImage className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Build Your Professional Portfolio</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our Express Mastery Month program and create a portfolio that opens doors
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

export default DigitalPortfolioMakingCourse;
