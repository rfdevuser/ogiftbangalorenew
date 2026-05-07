import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Award, Briefcase, Building2, Star } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-placements.jpg';

const Placements = () => {
  const stats = [
    { icon: TrendingUp, value: '100%', label: 'Placement Rate', subtext: 'Last 3 years average' },
    { icon: Briefcase, value: '₹4.5L', label: 'Average Package', subtext: 'Per annum' },
    { icon: Building2, value: '50+', label: 'Partner Companies', subtext: 'Top fashion brands' },
    { icon: Users, value: '500+', label: 'Alumni Placed', subtext: 'Since 2010' },
  ];

  const companies = [
    'Fabindia', 'Myntra', 'Raymond', 'Westside', 'Pantaloons',
    'W', 'AND', 'Vero Moda', 'Lifestyle', 'Shoppers Stop',
    'Max Fashion', 'Zara', 'H&M', 'Reliance Trends', 'Tommy Hilfiger'
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Fashion Designer at Fabindia',
      batch: '2022',
      text: 'Onati Global gave me the skills and confidence to pursue my dream career. The placement support was exceptional, and I landed my dream job at Fabindia.',
    },
    {
      name: 'Rahul Mehta',
      role: 'Stylist at Myntra',
      batch: '2021',
      text: 'The industry connections and practical training I received at Onati were invaluable. I am grateful for the comprehensive education and career guidance.',
    },
    {
      name: 'Ananya Reddy',
      role: 'Textile Designer at Raymond',
      batch: '2023',
      text: 'Best decision of my life! The faculty\'s industry experience and the institute\'s modern facilities prepared me perfectly for the corporate world.',
    },
  ];

  const placementProcess = [
    { step: '01', title: 'Resume Building', description: 'Professional resume and portfolio development workshops' },
    { step: '02', title: 'Interview Prep', description: 'Mock interviews and personality development sessions' },
    { step: '03', title: 'Industry Exposure', description: 'Company visits and internship opportunities' },
    { step: '04', title: 'Campus Placements', description: 'Direct recruitment drives by partner companies' },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>100% Placement | Fashion Design Jobs Bangalore | OGIFT 2026</title>
        <meta name="description" content="OGIFT delivers 100% placement for fashion design graduates in Bangalore. 500+ alumni at Fabindia, Myntra, Raymond, Zara, H&M & 50+ top brands. Avg package ₹4.5L. Best fashion institute for careers — since 2010." />
        <meta name="keywords" content="fashion design placement bangalore, 100% placement fashion institute bangalore, fashion job bangalore, fashion design career bangalore, fashion brand jobs bangalore, Fabindia Myntra Raymond fashion jobs, garment industry jobs bangalore, fashion design package bangalore, OGIFT placements, Onati Global placement record, fashion career support bangalore 2026, fashion internship bangalore" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/placements" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:title" content="100% Placement | Fashion Design Jobs Bangalore | OGIFT 2026" />
        <meta property="og:description" content="OGIFT Bangalore — 100% placement, 500+ alumni at top brands. Avg package ₹4.5L. Recruiting partners: Fabindia, Myntra, Raymond, Zara, H&M & 50+ fashion brands. Best placement record since 2010." />
        <meta property="og:url" content="https://www.ogiftbangalore.com/placements" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="100% Placement | OGIFT Bangalore | Fashion Design Careers 2026" />
        <meta name="twitter:description" content="100% placement. 500+ alumni at Fabindia, Myntra, Raymond & 50+ brands. Avg ₹4.5L package. Best fashion placement record in Bangalore." />
        <meta name="twitter:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              100% Placement Success
            </h1>
            <p className="text-xl text-muted-foreground">
              Leading fashion design institute in Bangalore with guaranteed career placement support
            </p>
          </div>
        </div>
      </section>

      {/* Placement Stats */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Placement Track Record</h2>
            <p className="text-xl text-muted-foreground">Industry-leading placement statistics</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.subtext}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Placement Process</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive support from day one to your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {placementProcess.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiting Companies */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Recruiting Partners</h2>
            <p className="text-xl text-muted-foreground">
              Top fashion brands and retail companies hire our graduates
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
              {companies.map((company, index) => (
                <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow">
                  <div className="text-sm font-medium text-foreground">{company}</div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-muted-foreground">...and many more leading fashion companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Hear from our successfully placed alumni
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground mt-1">Batch of {testimonial.batch}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Support Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Career Support Services</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive career development throughout your journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Briefcase, title: 'Internship Programs', description: 'Mandatory industry internships with top fashion brands' },
              { icon: Users, title: 'Industry Mentorship', description: 'One-on-one mentorship from fashion industry experts' },
              { icon: Award, title: 'Soft Skills Training', description: 'Communication, presentation, and leadership development' },
              { icon: Building2, title: 'Industry Networking', description: 'Regular industry events and fashion shows' },
              { icon: TrendingUp, title: 'Portfolio Development', description: 'Professional portfolio creation and review' },
              { icon: Star, title: 'Alumni Network', description: 'Access to 500+ alumni across the fashion industry' },
            ].map((service, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <service.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Related Pages at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link to="/community" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fashion Community</span></Link>
            <Link to="/videos" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Video Lessons</span></Link>
            <Link to="/quicktour" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Quick Tour</span></Link>
            <Link to="/courses/onlinecourse" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Online Fashion Course</span></Link>
            <Link to="/careers/work-from-home" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Work From Home</span></Link>
            <Link to="/courses/graphic-designing-for-fashion" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Graphic Design for Fashion</span></Link>
            <Link to="/courses/fashion-styling" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fashion Styling Course</span></Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">100% Placement Support — OGIFT Bangalore</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>OGIFT's 100% placement support programme is available to every graduate of the institute's courses and diploma programmes. The fashion industry in India is growing rapidly — driven by e-commerce, domestic retail expansion, export garment manufacturing, and the increasing global demand for Indian design talent — and OGIFT's placement network is built to connect graduates directly with the opportunities created by this growth. Industry partners include Fabindia, Raymond, Myntra, Lifestyle, Zara, H&amp;M, and boutique design studios across Bangalore and Karnataka.</p>
              <p>Placement support at OGIFT begins before graduation. As students complete their programmes, the OGIFT careers team reviews their portfolio, discusses their career goals, and begins matching them to suitable openings. Mock interviews, résumé preparation, and professional presentation sessions are part of the placement preparation process. Graduates who are interested in freelancing, entrepreneurship, or boutique ownership also receive guidance on how to establish themselves independently — including how to price their services, find clients, and build a professional reputation.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Career Paths for OGIFT Graduates</h3>
              <p>OGIFT graduates pursue careers across the full breadth of the Indian fashion industry. Common career paths include fashion designer, assistant designer, pattern maker, garment technician, production executive, fashion stylist, visual merchandiser, boutique manager, fashion illustrator, costume designer, fashion educator, and e-commerce product photographer. Graduates with entrepreneurial ambitions launch their own boutiques, tailoring units, or freelance styling and design consultancies. OGIFT's curriculum is specifically designed to equip students with skills that are immediately employable — so that graduates can contribute productively from their very first week in a new role.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Getting Started</h3>
              <p>To learn more about OGIFT's placement outcomes and to speak with former graduates about their career journeys, contact the institute at +91 90369 28799 or email admissions@ogiftbangalore.com. Campus visits are welcome — the OGIFT team will walk you through recent placement case studies and give you a realistic picture of what a career in fashion looks like from the starting point of an OGIFT qualification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4">Start Your Fashion Career Today</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join Bangalore's premier fashion institute with 100% placement assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Talk to Placement Team
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Placements;
