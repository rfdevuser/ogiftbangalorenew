import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Award, Briefcase, Building2, Star } from 'lucide-react';
import heroImage from '@/assets/hero-placements.jpg';
import { Link } from 'react-router-dom';

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
      {/* <section className="py-20 bg-muted/30">
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
      </section> */}

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
      {/* <section className="py-20 bg-muted/30">
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
      </section> */}

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
                 <Link to="/Admissions"  >Enroll</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Placements;
