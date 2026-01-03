import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Award, BookOpen, TrendingUp, Star } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';
import {useEffect,useState} from "react"
import {isMobile} from "react-device-detect"
import { CoursePromoPopup } from '@/components/CoursePromoPopup';
import StructuredData from '@/components/StructuredData';


const Home = () => {
 
  // Define your image paths
  const images = [
    "/images/hero/image1.jpg",
    "/images/hero/image2.jpg",
    "/images/hero/image3.jpg",
    "/images/hero/image4.jpg",
    "/images/hero/image6.jpg",
    "/images/hero/image7.jpg",
    "/images/hero/image9.jpg",
  ];

   const newsItems = [
    { title: 'New fashion design course for 2025-26 batch starting next month! Enroll now!' },
    { title: 'Internship opportunities available at top fashion houses. Apply now!' },
    { title: 'Learn from industry experts at our upcoming workshop series.' },
    {title: 'Exciting new collection launch next week! Stay tuned for updates.'}
    // Add more news items as needed
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Function to transition to the next image
  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    // Transition to the next image every 5 seconds
    const interval = setInterval(nextImage, 3000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [setCurrentImage]);

  // SEO: Update page title and meta description for home page
  useEffect(() => {
    const pageTitle = 'Onati Global Institute of Fashion Technology - Top Fashion Design Institute in Bangalore';
    const pageDescription = 'Premier fashion design institute in Bangalore offering professional courses in fashion technology, design, and styling. Industry-focused curriculum with 100% placement support. Enroll now!';
    const pageUrl = 'https://ogiftbangalore.com';
    const pageImage = 'https://ogiftbangalore.com/og-image.jpg';

    document.title = pageTitle;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }

    // Add meta keywords for SEO
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'fashion design institute bangalore, boutique management courses, pattern making courses, 3 months fashion designing course, 1 month fashion designing course, fashup course, no fees free course in fashion designing, fashion technology courses, fashion designing college, garment technology, fashion styling courses, best fashion school bangalore, fashion design diploma, apparel design, textile design, fashion career, OGIFT bangalore, onati global institute');

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', pageUrl);
    }

    // Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:url', content: pageUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: pageImage },
      { property: 'og:site_name', content: 'OGIFT Bangalore' },
      { property: 'og:locale', content: 'en_IN' },
    ];

    ogTags.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
      { name: 'twitter:image', content: pageImage },
    ];

    twitterTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });
  }, []);

  const stats = [
    { icon: GraduationCap, value: 'TAILORED COURSES', label: '' },
    { icon: Award, value: 'HIGH PLACEMENT SUCCESS', label: '' },
    { icon: Users, value: 'INDUSTRY PARTNERSHIPS', label: '' },
    { icon: Star, value: 'HIGH STUDENT RATINGS', label: '' },
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
    <div className="min-h-screen" >
        <CoursePromoPopup />
        <StructuredData/>
       {/* {images?.length > 0  &&
            images?.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity -z-20 duration-1000 ${
                  index === currentImage ? "opacity-50" : "opacity-0"
                }`}
              >
                <img src={image}               
                  alt={`Slide ${index + 1}`}
                  // layout="fill"
                  
                  // objectFit="cover"
                 loading="lazy"
                  // quality={100}
                />
              </div>
            ))} */}
      {/* Hero Section */}
     
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[url('/OGIFTImageopaque.png')] bg-center bg-cover " >
             
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-primary">
              The Runway to Your Professional Future
            </h1>
            <p className="text-xl md:text-2xl font-bold">
              Join Bangalore's premier fashion design institute. Expert faculty, modern facilities, and guaranteed career support.
            </p>
            <p></p>
           
           
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-muted/30">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-2xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    

      {/* Why Choose Us */}
      <section className="py-40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Onati Global?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leading fashion institute in Bangalore with a proven track record of excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow bg-muted">
                <item.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Courses Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Popular Courses</h2>
            <p className="text-xl text-muted-foreground">
              Industry-aligned programs designed for your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12 ">
            {['Express Mastery Month', 'FASHUP - Experience Our Taster Sessions','3 Months Capsule Courses',"6 Months Diploma in Fashion Designing","One Year Advanced Diploma in Fashion Designing"].map((course, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-muted">
                <h3 className="text-2xl font-semibold mb-3">{course}</h3>
                <p className="text-muted-foreground mb-4">
                  Expertly Tailored to suit your needs.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/courses">Learn More →</Link>
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center">
            {/* <Button size="lg" asChild>
              <Link to="/courses">View All Courses</Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Fashion Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of successful designers who started their career at Onati Global Institute
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+919036928799">Call: +91 90369 28799</a>
            </Button>
            {/* <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <a href="mailto:admissions@ogiftbangalore.com">Email Us</a>
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
