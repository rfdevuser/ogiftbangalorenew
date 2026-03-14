import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Award, BookOpen, TrendingUp, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { RazorpayCheckout } from '@/components/RazorpayCheckout';
import { CoursePromoPopup } from '@/components/CoursePromoPopup';
import StructuredData from '@/components/StructuredData';
import heroImage from '@/assets/hero-home.jpg';
import landingimage from '@/assets/landing-roi-education.jpg'

const Home = () => {
  const stats = [
    { icon: GraduationCap, value: 'World Class Training', label: '' },
    { icon: Award, value: 'High Placement Rate', label: '' },
    { icon: Users, value: 'Industry Partners', label: '' },
    { icon: Star, value: 'AI Powered & Multi-Lingual', label: '' },
  ];

  const highlights = [
    {
      icon: BookOpen,
      title: 'Industry-Focused Curriculum',
      description: 'Learn from experienced faculty with real-world fashion industry expertise',
    },
    {
      icon: TrendingUp,
      title: 'Career Development',
      description: 'Comprehensive placement support with top fashion brands and design houses',
    },
    {
      icon: Award,
      title: 'State-of-Art Facilities',
      description: 'Modern labs, design studios, and workshops equipped with latest technology',
    },
  ];

  return (
    <main className="min-h-screen" role="main">
      <Helmet>
        <title>Onati Global Institute of Fashion Technology - Top Fashion Design Institute in Bangalore</title>
        <meta name="description" content="Premier fashion design institute in Bangalore offering professional courses in fashion technology, design, and styling. Industry-focused curriculum with 100% placement support. Enroll now!" />
        <meta name="keywords" content="fashion design institute bangalore, fashion technology courses, fashion designing college, garment technology, fashion styling courses, best fashion school bangalore, fashion design diploma, apparel design, textile design, fashion career, OGIFT bangalore, onati global institute" />
        <link rel="canonical" href="https://www.ogiftbangalore.com" />
        <meta property="og:title" content="Onati Global Institute of Fashion Technology - Leading Fashion Design College in Bangalore" />
        <meta property="og:description" content="Premier fashion design institute in Bangalore offering professional courses in fashion technology, design, and styling. Industry-focused curriculum with 100% placement support." />
        <meta property="og:url" content="https://www.ogiftbangalore.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
        <meta property="og:site_name" content="OGIFT Bangalore" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Onati Global Institute - Best Fashion Design Institute Bangalore" />
        <meta name="twitter:description" content="Premier fashion technology education in Bangalore. Expert faculty, modern facilities, 100% placement assistance." />
        <meta name="twitter:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
      </Helmet>
      <StructuredData />
      {/* <CoursePromoPopup />
       */}
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        aria-label="Welcome to Onati Global Fashion Institute"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${landingimage})` }}
          role="img"
          aria-label="Fashion design students at Onati Global Institute campus"
        >
          <div className="absolute inset-0 " />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <header className="max-w-3xl">
            <h1 className="text-5xl text-white md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Transform Your Passion Into Fashion
            </h1>
            <p className="text-xl text-white md:text-2xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              Join Bangalore's premier fashion design institute. Expert faculty, modern facilities, and guaranteed career support.
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300" aria-label="Primary actions">
              <Button size="lg" asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
              {/* <Button size="lg" variant="outline" asChild>
                <a href="#contact">Book a Campus Tour</a>
              </Button> */}
              {/* <RazorpayCheckout
                amount={100}
                name="Onati Global Institute"
                description="Course Payment"
                buttonText="Make Payment"
                onSuccess={(res) => console.log("Payment success:", res)}
                onFailure={(err) => console.error("Payment failed:", err)}
                className="h-11"
              /> */}
            </nav>
          </header>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30" aria-label="Institute achievements">
        <div className="container mx-auto px-4">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-8" role="list">
            {stats.map((stat, index) => (
              <li key={index} className="text-center">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" aria-hidden="true" />
                <p className="text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20" aria-labelledby="why-choose-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="why-choose-heading" className="text-4xl font-bold mb-4">Why Choose Onati Global?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leading fashion institute in Bangalore with a proven track record of excellence
            </p>
          </header>

          <ul className="grid md:grid-cols-3 gap-8" role="list">
            {highlights.map((item, index) => (
              <li key={index}>
                <Card className="p-8 hover:shadow-lg transition-shadow h-full">
                  <item.icon className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick Courses Preview */}
      <section className="py-20 bg-muted/30" aria-labelledby="courses-heading">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h2 id="courses-heading" className="text-4xl font-bold mb-4">Our Popular Courses</h2>
            <p className="text-xl text-muted-foreground">
              Industry-aligned programs designed for your success
            </p>
          </header>

          <ul className="grid md:grid-cols-3 gap-8 mb-12" role="list">
            {['Fashion Design', 'Garment Technology', 'Fashion Styling'].map((course, index) => (
              <li key={index}>
                <article>
                  <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                    <h3 className="text-2xl font-semibold mb-3">{course}</h3>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive program with hands-on training and industry exposure
                    </p>
                    <Button variant="link" className="p-0" asChild>
                      <Link to="/courses">Learn More →</Link>
                    </Button>
                  </Card>
                </article>
              </li>
            ))}
          </ul>

          <nav className="text-center" aria-label="View all courses">
            <Button size="lg" asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </nav>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="contact" 
        className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground"
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-4xl font-bold mb-6">Ready to Start Your Fashion Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of successful designers who started their career at Onati Global Institute
          </p>
          <nav className="flex flex-col sm:flex-row gap-4 justify-center" aria-label="Contact options">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+919036928799" aria-label="Call us at +91 90369 28799">Call: +91 90369 28799</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <a href="mailto:admissions@ogiftbangalore.com" aria-label="Email admissions at ogiftbangalore.com">Email Us</a>
            </Button>
          </nav>
        </div>
      </section>
    </main>
  );
};

export default Home;
