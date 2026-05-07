import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, Store, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const FashionDesigningBoutiqueManagementCourse = () => {
  const topics = [
    {
      title: 'Introduction to Boutique Management',
      description: 'Learn the fundamentals of running a successful fashion boutique business.'
    },
    {
      title: 'Brand Identity & Concept Development',
      description: 'Develop a unique brand identity and concept for your boutique.'
    },
    {
      title: 'Inventory Management & Sourcing',
      description: 'Master inventory control and sourcing strategies for boutique operations.'
    },
    {
      title: 'Visual Merchandising & Store Layout',
      description: 'Learn visual merchandising techniques and effective store layout planning.'
    },
    {
      title: 'Pricing, Costing & Budgeting',
      description: 'Master cost sheet preparation, pricing strategies, and budget management.'
    },
    {
      title: 'Customer Handling & Sales Strategies',
      description: 'Develop effective customer service and sales techniques.'
    },
    {
      title: 'Digital Tools & Boutique Promotion',
      description: 'Learn digital marketing and promotional strategies for boutiques.'
    }
  ];

  const highlights = [
    'Inventory & Merchandising',
    'Financial Management',
    'Customer Experience & Sales',
    'Legal & Operations'
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Fashion Designing & Boutique Management",
    "description": "A 1-month course covering business and retail skills to launch, operate and grow a small fashion retail enterprise at OGIFT Bangalore.",
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
        <title>Best Boutique Management Course Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="title" content="Best Fashion Designing & Boutique Management Course Bangalore 2026 | Onati Global Institute" />
        <meta name="description" content="Best boutique management course in Bangalore at OGIFT — brand identity, inventory, visual merchandising, pricing & digital promotion. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!" />
        <meta name="keywords" content="best boutique management course bangalore, fashion boutique course bangalore 2026, fashion business course bangalore, visual merchandising course bangalore, fashion retail course, boutique startup course, OGIFT, Onati Global, express mastery course, fashion designing boutique admissions 2026" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/fashion-designing-boutique-management" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/fashion-designing-boutique-management" />
        <meta property="og:title" content="Fashion Designing & Boutique Management Course | OGIFT Bangalore" />
        <meta property="og:description" content="1-month boutique management course at OGIFT Bangalore. Brand identity, inventory, visual merchandising, pricing and digital promotion. Certificate included." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/fashion-designing-boutique-management" />
        <meta name="twitter:title" content="Fashion Designing & Boutique Management Course | OGIFT Bangalore" />
        <meta name="twitter:description" content="1-month fashion boutique management course at OGIFT Bangalore. Learn to launch and grow your own boutique business. Certificate included." />

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
              Fashion Designing & Boutique Management
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get introduced to the business and retail skills needed to successfully launch, operate, and grow a small fashion retail enterprise.
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
                <Link to="/courses/category/home-maker">View All Courses</Link>
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
              Learn to run a successful fashion boutique business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <Store className="h-10 w-10 mx-auto mb-4 text-primary" />
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
              <p>Running a successful fashion boutique requires far more than a good eye for design. It demands a clear understanding of business operations, customer psychology, financial management, brand building, and digital marketing — all applied within the competitive reality of the Indian fashion retail market. OGIFT's 1-month Fashion Designing and Boutique Management course in Bangalore equips aspiring boutique owners and fashion entrepreneurs with the complete skill set to launch, operate, and grow a profitable fashion business.</p>
              <p>The course is structured to be immediately practical. From the very first session, you will learn how to define a boutique concept, build a brand identity, plan inventory, set pricing, manage costs, and design a store layout that maximises customer experience. You will also learn digital marketing and social media promotion strategies specific to fashion retail, and how to use free tools to manage customer relationships and drive repeat business. Faculty draw on real-world experience running and consulting for fashion boutiques in Bangalore, making every lesson directly applicable to the current market. Classes are available in English, Hindi, and Kannada.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Is This Course For?</h3>
              <p>This course is ideal for aspiring boutique owners, home-based tailors who want to formalise their business, fashion designers who want to retail their own work, and anyone interested in the business side of fashion. It is also suitable for existing boutique owners who want to improve their operations, pricing strategy, or digital presence. No prior business education is required. Eligibility is Class 10 (SSC) and above.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Career Outcomes</h3>
              <p>Graduates launch their own boutiques, work as boutique managers, fashion retail consultants, visual merchandisers, and brand managers. The skills taught in this course are also directly applicable to positions in fashion retail chains, multi-brand outlets, and e-commerce fashion businesses. OGIFT's 100% placement support connects graduates with relevant opportunities in the fashion industry across Bangalore and Karnataka.</p>
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
              Complete boutique management from concept to customer success
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
                    <TrendingUp className="h-6 w-6 text-primary" />
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
                  'Develop a unique boutique brand identity',
                  'Manage inventory and sourcing efficiently',
                  'Create attractive store layouts and displays',
                  'Prepare cost sheets and manage budgets',
                  'Handle customers and close sales effectively',
                  'Promote your boutique using digital tools'
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
            <Store className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Start Your Boutique Journey</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our Express Mastery Month program and learn to run a successful fashion boutique
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

export default FashionDesigningBoutiqueManagementCourse;
