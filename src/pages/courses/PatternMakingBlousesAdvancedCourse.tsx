import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, Scissors, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const PatternMakingBlousesAdvancedCourse = () => {
  const topics = [
    {
      title: 'Plain Blouse',
      description: 'Master the foundation of blouse patterns with proper dart placement and fitting techniques.'
    },
    {
      title: 'Princess-Cut Blouse',
      description: 'Learn to draft elegant princess seam blouses with perfect body contouring.'
    },
    {
      title: 'Boat Neck Blouse',
      description: 'Create stylish boat neckline patterns with proper shoulder and neckline shaping.'
    },
    {
      title: 'Cape Sleeve Blouse',
      description: 'Draft dramatic cape sleeve patterns for contemporary blouse designs.'
    },
    {
      title: 'Petal Sleeve Blouse',
      description: 'Master the delicate petal sleeve construction with overlapping layers.'
    },
    {
      title: 'Puff Sleeve Blouse',
      description: 'Create voluminous puff sleeve patterns with proper gathering techniques.'
    },
    {
      title: 'Peter Pan Collar Blouse',
      description: 'Learn to draft the classic Peter Pan collar with perfect proportions.'
    },
    {
      title: 'Peplum Blouse',
      description: 'Create flattering peplum blouse patterns with waist emphasis and flare.'
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
    "name": "Pattern Making Blouses Advanced Course",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Onati Global Institute of Fashion Technology",
      "alternateName": "OGIFT Bangalore",
      "url": "https://www.ogiftbangalore.com"
    },
    "timeRequired": "P1M",
    "educationalLevel": "Advanced",
    "inLanguage": ["en", "hi", "kn"],
    "offers": {
      "@type": "Offer",
      "price": "28180",
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
        <title>Best Blouse Pattern Making Course Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="title" content="Best Advanced Blouse Pattern Making Course Bangalore 2026 | Onati Global Institute" />
        <meta name="description" content="Best blouse pattern making course in Bangalore at OGIFT — 8 advanced styles: princess cut, boat neck, cape sleeve, puff sleeve & peplum. 1-month, 4.9★ rated. 100% placement. Admissions 2026 open!" />
        <meta name="keywords" content="best blouse pattern making course bangalore, advanced blouse pattern bangalore 2026, princess cut blouse pattern course, puff sleeve blouse pattern, peplum blouse pattern, OGIFT, Onati Global, express mastery course, blouse design course bangalore, admissions 2026 fashion" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/pattern-making-blouses-advanced" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/pattern-making-blouses-advanced" />
        <meta property="og:title" content="Pattern Making Blouses Advanced Course | OGIFT Bangalore" />
        <meta property="og:description" content="1-month advanced blouse pattern making at OGIFT Bangalore. 8 styles: princess cut, boat neck, cape, puff sleeve, Peter Pan collar & peplum. Certificate included." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/pattern-making-blouses-advanced" />
        <meta name="twitter:title" content="Pattern Making Blouses Advanced Course | OGIFT Bangalore" />
        <meta name="twitter:description" content="1-month advanced blouse patterns at OGIFT Bangalore. 8 styles: princess cut, puff sleeve, peplum & more. Certificate included." />
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
              Express Mastery Month - Advanced
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Pattern Making Blouses (Advanced)
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Dive into the fascinating world of Pattern Creation and Development of Blouses. Master advanced techniques for creating stunning blouse designs.
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
              Elevate your blouse pattern making skills to professional level
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <Shirt className="h-10 w-10 mx-auto mb-4 text-primary" />
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
            <h2 className="text-4xl font-bold mb-4">Blouse Styles You'll Master</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn to create patterns for 8 stunning blouse designs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {topics.map((topic, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Scissors className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                  <p className="text-muted-foreground text-sm">{topic.description}</p>
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
                  'Create professional blouse patterns for various necklines',
                  'Master sleeve variations from cape to puff styles',
                  'Draft princess seams for flattering body silhouettes',
                  'Design collar patterns including Peter Pan styles',
                  'Create peplum details with proper flare calculations',
                  'Apply advanced fitting techniques for blouse construction'
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
                  <span className="font-semibold">Advanced</span>
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
                  <span className="text-muted-foreground">Blouse Styles</span>
                  <span className="font-semibold">8 Types</span>
                </div>
                {/* <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="font-semibold text-primary">Call Institute for Details</span>
                </div> */}
                 <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Total Fees</span>
                  <span className="font-semibold">₹43,200</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Fashup Discount (10 Hours Free)</span>
                  <span className="font-semibold text-red-600">- ₹15,120</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">To Pay</span>
                  <span className="font-semibold text-primary text-lg">₹28,180</span>
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
              <p>The Advanced Blouse Pattern Making course at OGIFT Bangalore is a focused 1-month Express Mastery programme covering the full range of blouse constructions — one of the most technically demanding and commercially valuable specialisations in Indian fashion. The blouse is the garment that most directly expresses the craft of the Indian fashion designer: a well-fitted, beautifully constructed blouse requires precise pattern drafting, an understanding of the body, and mastery of construction details that no machine can replicate. This course teaches you to draft patterns for every blouse style professionally.</p>
              <p>The course covers sleeveless, short-sleeve, and full-sleeve blouse constructions; princess line and dart manipulation; neckline and back-neck variations; keyhole, hook-and-eye, and zip closures; high-neck, collar, and designer yoke constructions; and the fitting adjustments required for different body types. Students draft patterns from scratch on paper and construct toiles for fitting, learning to correct issues of fit, balance, and proportion before cutting in final fabric. Faculty at OGIFT draw on active experience in bridal and occasion wear to ensure the patterns you learn reflect current industry demand.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Is This Course For?</h3>
              <p>This course is ideal for tailors and fashion designers who want to formalise and expand their blouse drafting skills, students who have completed the basic pattern making course and want to advance, and bridal wear specialists who need precise, customisable blouse patterns. Eligibility is Class 10 (SSC) and above.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Career Outcomes</h3>
              <p>Graduates work as specialist blouse makers, bridal wear designers, made-to-measure tailors, pattern makers for kurta and saree blouse manufacturers, and freelance pattern consultants. Advanced blouse pattern skills are in high demand across Bangalore's boutique sector. OGIFT's placement network connects graduates with leading bridal studios and garment businesses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Related Pattern Making Courses at OGIFT</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Advanced Blouse Pattern Making course builds on the skills taught in OGIFT's <Link to="/courses/pattern-making-basic" className="text-primary underline hover:no-underline font-medium">Pattern Making Basic course</Link>. Related advanced courses include the <Link to="/courses/pattern-making-western-advanced" className="text-primary underline hover:no-underline font-medium">Advanced Western Pattern Making course</Link> covering dresses, trousers, and jackets, and the <Link to="/courses/pattern-making-kids-clothing" className="text-primary underline hover:no-underline font-medium">Kids Clothing Pattern Making course</Link>. The <Link to="/courses/art-of-garment-foundation" className="text-primary underline hover:no-underline font-medium">Art of Garment Foundation course</Link> covers garment construction skills that complement pattern drafting. For a comprehensive qualification, the <Link to="/courses/design-process-pattern-making-3months" className="text-primary underline hover:no-underline font-medium">3-month Design Process and Pattern Making course</Link> covers all these areas in an integrated programme.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Shirt className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Master Advanced Blouse Patterns</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our Express Mastery Month program and learn to create patterns for 8 stunning blouse styles
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

export default PatternMakingBlousesAdvancedCourse;
