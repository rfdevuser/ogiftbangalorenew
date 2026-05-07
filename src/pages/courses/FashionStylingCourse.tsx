import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, Sparkles, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const FashionStylingCourse = () => {
  const topics = [
    {
      title: 'Understanding Body Types',
      description: 'Learn to analyze different body types and select flattering styles for each.'
    },
    {
      title: 'Image Makeover',
      description: 'Master the art of transforming personal image through styling techniques.'
    },
    {
      title: 'Fashion Forecasting & Trend Report',
      description: 'Learn to predict fashion trends and create professional trend reports.'
    },
    {
      title: 'Exposure to Current Fashion Industry',
      description: 'Get insights into the current fashion industry landscape and opportunities.'
    },
    {
      title: 'Cultural Influences on Fashion',
      description: 'Study various cultures and their influence on contemporary fashion today.'
    }
  ];

  const highlights = [
    'Image Conception & Mood Boards',
    'Wardrobe Curation & Sourcing',
    'Editorial & Commercial Styling',
    'Client & Body Analysis'
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Fashion Styling",
    "description": "A 1-month course introducing the visual and creative skills needed to select and coordinate clothing and accessories for photoshoots, editorials, and personal clients at OGIFT Bangalore.",
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
        <title>Best Fashion Styling Course Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="title" content="Best Fashion Styling Course Bangalore 2026 | Onati Global Institute of Fashion Technology" />
        <meta name="description" content="Best fashion styling course in Bangalore at OGIFT — body type analysis, image makeover, trend forecasting & editorial styling. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!" />
        <meta name="keywords" content="best fashion styling course bangalore, fashion stylist course bangalore 2026, personal styling course bangalore, image makeover course, fashion trend forecasting, editorial styling course, OGIFT, Onati Global, express mastery course, fashion styling admissions 2026, stylist training bangalore" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/fashion-styling" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/fashion-styling" />
        <meta property="og:title" content="Fashion Styling Course | OGIFT Bangalore" />
        <meta property="og:description" content="1-month fashion styling course at OGIFT Bangalore. Body analysis, image makeover, trend forecasting and editorial styling. Certificate included." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/fashion-styling" />
        <meta name="twitter:title" content="Fashion Styling Course | OGIFT Bangalore" />
        <meta name="twitter:description" content="1-month fashion styling course at OGIFT Bangalore. Body analysis, image makeover, trend forecasting & editorial styling. Certificate included." />

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
              Fashion Styling
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              This course will introduce you to the visual and creative skills necessary to select and coordinate clothing and accessories for photoshoots, editorials, and personal clients.
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
              Become a professional fashion stylist
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <Eye className="h-10 w-10 mx-auto mb-4 text-primary" />
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
              <p>Fashion styling is one of the fastest-growing career paths in the Indian fashion industry. As the media, entertainment, and e-commerce sectors continue to expand, the demand for skilled stylists — who can pull together compelling looks for photoshoots, films, brand campaigns, and personal clients — has never been higher. This 1-month Fashion Styling course at OGIFT Bangalore gives you the practical skills and industry knowledge to begin a career as a professional stylist.</p>
              <p>The course covers the full scope of styling practice: body type analysis and fit consultation, wardrobe curation and sourcing, mood board and image concept development, editorial and commercial styling, and fashion trend forecasting. You will study how cultural influences shape contemporary fashion, how to read and anticipate market trends, and how to build a cohesive look that suits a client's personality and purpose. OGIFT faculty bring real industry experience to the classroom, sharing practical insights from shoots, brand campaigns, and editorial work. Classes are available in English, Hindi, and Kannada.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Is This Course For?</h3>
              <p>This course is ideal for aspiring fashion stylists, image consultants, personal shoppers, social media content creators, and fashion enthusiasts who want to turn their eye for aesthetics into a professional skill. It is also valuable for fashion designers who want to understand how their work is styled and presented, and for photographers who collaborate closely with styling teams. No prior styling experience is required. Eligibility is Class 10 (SSC) and above.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Career Outcomes</h3>
              <p>Graduates pursue careers as personal stylists, editorial stylists, celebrity stylists, brand stylists, fashion content creators, wardrobe consultants, and image consultants. Fashion styling skills are in demand at e-commerce companies, film and television production houses, advertising agencies, and fashion magazines. OGIFT's 100% placement support helps graduates connect with industry opportunities across Bangalore and beyond.</p>
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
              From body analysis to trend forecasting
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {topics.map((topic, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
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
                  'Analyze body types and recommend flattering styles',
                  'Create complete image makeovers for clients',
                  'Forecast fashion trends and create trend reports',
                  'Understand the current fashion industry landscape',
                  'Apply cultural influences to styling decisions',
                  'Style for editorials, commercial shoots, and personal clients'
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

      {/* Related Courses */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Related Courses at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            <Link to="/courses/one-year-advanced-diploma-fashion-designing" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">1-Year Advanced Diploma</span></Link>
            <Link to="/courses/six-months-diploma-fashion-designing" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">6-Month Diploma</span></Link>
            <Link to="/courses/fashion-illustration" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fashion Illustration</span></Link>
            <Link to="/courses/art-of-garment-foundation" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Garment Foundation</span></Link>
            <Link to="/courses/fabric-knowledge-textile-designing" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fabric &amp; Textile</span></Link>
            <Link to="/courses/graphic-designing-for-fashion" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Graphic Design for Fashion</span></Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Related Career and Creative Resources at OGIFT</h2>
          <p className="text-muted-foreground leading-relaxed">
            Fashion styling skills open doors across multiple career paths. <Link to="/placements" className="text-primary underline hover:no-underline font-medium">OGIFT's placement programme</Link> regularly places styling graduates with fashion brands, boutiques, and e-commerce companies in Bangalore. The <Link to="/careers/work-from-home" className="text-primary underline hover:no-underline font-medium">Work From Home programme</Link> connects stylists with remote styling assignments — lookbook production, social media styling, and wardrobe consulting can all be done from home. The <Link to="/courses/graphic-designing-for-fashion" className="text-primary underline hover:no-underline font-medium">Graphic Design for Fashion course</Link> is a popular complement to styling, enabling graduates to create their own promotional content and brand materials. The <Link to="/community" className="text-primary underline hover:no-underline font-medium">OGIFT Community</Link> is a useful network for finding editorial and collaboration opportunities.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Eye className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Become a Fashion Stylist</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our Express Mastery Month program and master the art of fashion styling
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

export default FashionStylingCourse;
