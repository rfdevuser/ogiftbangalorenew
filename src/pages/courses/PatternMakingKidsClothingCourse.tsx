import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, Scissors, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const PatternMakingKidsClothingCourse = () => {
  const topics = [
    {
      title: 'A-Line Frock',
      description: 'Master the classic A-line frock pattern perfect for children\'s wear.'
    },
    {
      title: 'Layer Skirt',
      description: 'Create playful layered skirt patterns with proper tier construction.'
    },
    {
      title: 'Gather Frock',
      description: 'Learn gathered frock patterns with proper fullness for kids.'
    },
    {
      title: 'Umbrella Frock',
      description: 'Draft umbrella frock patterns with full circular flare.'
    },
    {
      title: 'Plain Frock',
      description: 'Create basic plain frock patterns as foundation for variations.'
    },
    {
      title: 'Jabla',
      description: 'Master traditional jabla patterns for infant and toddler wear.'
    }
  ];

  const highlights = [
    'Creative Design',
    'Pattern Making',
    'Pattern Visualization',
    'Introduction to Pattern Development'
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Pattern Making for Kids Clothing Course",
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
        <title>Best Kids Clothing Pattern Making Course Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="title" content="Best Kids Clothing Pattern Making Course Bangalore 2026 | Onati Global Institute of Fashion Technology" />
        <meta name="description" content="Best kids clothing pattern making course in Bangalore at OGIFT — A-line frock, gathered frock, umbrella frock, layered skirt & jabla. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!" />
        <meta name="keywords" content="best kids clothing pattern making bangalore, children wear pattern making course bangalore 2026, frock pattern making course, jabla pattern course, kids fashion design course bangalore, OGIFT, Onati Global, express mastery course, kids garment patterns, children clothing course 2026" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/pattern-making-kids-clothing" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/pattern-making-kids-clothing" />
        <meta property="og:title" content="Pattern Making for Kids Clothing | OGIFT Bangalore" />
        <meta property="og:description" content="1-month kids clothing pattern making at OGIFT Bangalore. A-line frock, umbrella frock, gathered frock, layered skirt & jabla. Certificate included." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/pattern-making-kids-clothing" />
        <meta name="twitter:title" content="Pattern Making for Kids Clothing | OGIFT Bangalore" />
        <meta name="twitter:description" content="1-month kids clothing pattern making at OGIFT Bangalore. 6 styles including frocks, skirts & jabla. Certificate included." />
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
              Pattern Making for Kids Clothing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Dive into the fascinating world of Pattern Creation and Development of Kids Clothing. Learn to create adorable and comfortable garments for children.
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
              Specialize in children's wear pattern making
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <Baby className="h-10 w-10 mx-auto mb-4 text-primary" />
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
            <h2 className="text-4xl font-bold mb-4">Kids Clothing You'll Master</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn to create patterns for 6 essential kids' garment styles
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
                  'Create A-line and plain frock patterns for kids',
                  'Draft layered and gathered skirt patterns',
                  'Design umbrella frocks with circular flare',
                  'Make traditional jabla patterns for infants',
                  'Understand children\'s body proportions and sizing',
                  'Apply comfort and safety considerations in kids\' wear'
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
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Garment Types</span>
                  <span className="font-semibold">6 Styles</span>
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
          <h2 className="text-2xl font-bold mb-6 text-center">Related Pattern Making Courses at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            <Link to="/courses" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">All Courses</span></Link>
            <Link to="/courses/design-process-pattern-making-3months" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Design Process &amp; Pattern Making</span></Link>
            <Link to="/courses/pattern-making-basic" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Pattern Making Basic</span></Link>
            <Link to="/courses/pattern-making-blouses-advanced" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Blouses Pattern Making</span></Link>
            <Link to="/courses/pattern-making-western-advanced" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Western Pattern Making</span></Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Baby className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Master Kids Clothing Patterns</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our Express Mastery Month program and learn to create adorable kids' clothing
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
      </>
  );
};

export default PatternMakingKidsClothingCourse;
