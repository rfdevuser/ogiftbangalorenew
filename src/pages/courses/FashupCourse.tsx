import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, CheckCircle, Users, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-courses.jpg';

const FashupCourse = () => {
  const curriculum = [
    {
      day: 1,
      title: 'Introduction to Fashion Design Courses',
      description: 'Overview of course details: 3 months vocational course, 6 month diploma & 1 year diploma course.'
    },
    {
      day: 2,
      title: 'Fashion Design & Market Opportunities',
      description: 'Introduction about fashion design and their opportunity in today\'s market.'
    },
    {
      day: 3,
      title: 'Designer Collections & Categories',
      description: 'How designers do their collections and designer categories. Learn how they select themes and create collections from concept to product.'
    },
    {
      day: 4,
      title: 'Measurements & Body Types',
      description: 'How to take measurements and understanding different body types.'
    },
    {
      day: 5,
      title: 'Drafting Basic Bodice Block',
      description: 'Learn the fundamentals of drafting a basic bodice block pattern.'
    },
    {
      day: 6,
      title: 'Importance of Patterns',
      description: 'Why patterns are important and necessary in fashion design.'
    },
    {
      day: 7,
      title: 'Basic Bodice Block Pattern Making',
      description: 'Hands-on pattern making session for basic bodice block.'
    },
    {
      day: 8,
      title: 'Basic Stitching Knowledge',
      description: 'Starting with basic stitching knowledge and techniques.'
    },
    {
      day: 9,
      title: 'Basic Bodice Block Stitching',
      description: 'Practical session on stitching the basic bodice block.'
    },
    {
      day: 10,
      title: 'Finishing & Completion',
      description: 'Finishing the basic bodice block and course wrap-up.'
    }
  ];

  const highlights = [
    'Have Fun Learning',
    'Meet Like Minded Enthusiasts',
    'Seek Advice from our Trained Faculty',
    'Take The Plunge into Fashion'
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "FASHUP - Free Fashion Taster Sessions",
    "description": "A FREE 10-day introductory fashion course at OGIFT Bangalore. Experience fashion design education with no financial commitment — covering fashion basics, body measurements, pattern making and stitching.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Onati Global Institute of Fashion Technology",
      "alternateName": "OGIFT Bangalore",
      "url": "https://www.ogiftbangalore.com"
    },
    "timeRequired": "P10D",
    "educationalLevel": "Beginner",
    "inLanguage": ["en", "hi", "kn"],
    "offers": {
      "@type": "Offer",
      "price": "0",
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
        <title>FASHUP Free Fashion Design Course Bangalore 2026 | OGIFT | Enroll Now</title>
        <meta name="title" content="FASHUP Free Fashion Design Taster Course Bangalore 2026 | Onati Global Institute" />
        <meta name="description" content="Try fashion design FREE at OGIFT Bangalore! FASHUP — 10-day taster course covering fashion basics, body measurements, bodice block & stitching. Free certificate. Best fashion institute, 4.9★ rated. Enroll 2026!" />
        <meta name="keywords" content="free fashion design course bangalore, FASHUP OGIFT free course, free fashion taster class bangalore 2026, fashion introduction course bangalore, free fashion certificate bangalore, OGIFT, Onati Global, fashion for beginners bangalore, free fashion class 2026, best fashion institute bangalore free course" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/fashup-free-taster-sessions" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/fashup-free-taster-sessions" />
        <meta property="og:title" content="FASHUP - FREE 10-Day Fashion Taster Course | OGIFT Bangalore" />
        <meta property="og:description" content="Start your fashion journey for FREE! FASHUP is a 10-day taster course at OGIFT Bangalore covering fashion basics, pattern making and stitching. Certificate included." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/fashup-free-taster-sessions" />
        <meta name="twitter:title" content="FASHUP - FREE 10-Day Fashion Taster Course | OGIFT Bangalore" />
        <meta name="twitter:description" content="FREE 10-day fashion design taster course at OGIFT Bangalore. Pattern making, stitching and fashion basics. Certificate included. Enroll now!" />

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
              FREE Certificate Course
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              FASHUP - Experience Our FREE Taster Sessions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              There is no better way to start your fashion journey than experiencing the OGIFT Way of introducing you to the truly fascinating world of Fashion.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>10 Days Duration</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="h-5 w-5 text-primary" />
                <span>Certificate Included</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">Absolutely FREE</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/Admissions">Enroll Now - It's FREE!</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/courses">View All Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Join FASHUP?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect introduction to fashion design with no financial commitment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <CheckCircle className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold">{highlight}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10-Day Curriculum */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">10-Day Curriculum</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive journey from fashion basics to creating your first bodice block
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {curriculum.map((day) => (
              <Card 
                key={day.day} 
                className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">Day {day.day}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{day.title}</h3>
                    <p className="text-muted-foreground text-sm">{day.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What You'll Achieve</h2>
              <ul className="space-y-4">
                {[
                  'Understand the landscape of fashion design education',
                  'Learn about career opportunities in fashion industry',
                  'Master the basics of taking body measurements',
                  'Create your first basic bodice block pattern',
                  'Develop fundamental stitching skills',
                  'Complete a finished bodice block garment'
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
                  <span className="font-semibold">10 Days</span>
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
                  <span className="font-semibold">In-Person</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Fees</span>
                  <span className="font-bold text-primary text-xl">FREE</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Explore More at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link to="/courses/onlinecourse" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Online Fashion Course</span></Link>
            <Link to="/courses" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">All Courses</span></Link>
            <Link to="/about" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">About OGIFT</span></Link>
            <Link to="/admissions" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Admissions 2026</span></Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Start Your Fashion Journey Today!</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our FREE 10-day FASHUP program and discover if fashion design is your calling
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/Admissions">Enroll Now - It's FREE!</Link>
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

export default FashupCourse;
