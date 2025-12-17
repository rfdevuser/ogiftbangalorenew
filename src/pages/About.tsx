import { Card } from '@/components/ui/card';
import { Building2, Users, Award, Target, Eye, Heart, Zap, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-about.jpg';

const About = () => {
  const facilities = [
    { icon: Building2, title: 'Modern Infrastructure', description: 'State-of-the-art classrooms and design studios' },
    { icon: Users, title: 'Expert Faculty', description: '20+ industry professionals and designers' },
    { icon: Award, title: 'Industry Partnerships', description: 'Collaborations with 50+ fashion brands' },
    { icon: Zap, title: 'Advanced Labs', description: 'CAD labs, pattern making, and textile facilities' },
  ];

  const values = [
    { icon: Target, title: 'Excellence', description: 'Committed to delivering world-class fashion education' },
    { icon: Heart, title: 'Creativity', description: 'Nurturing innovative thinking and artistic expression' },
    { icon: Globe, title: 'Global Standards', description: 'International curriculum and industry practices' },
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
              About Onati Global Institute
            </h1>
            <p className="text-xl text-muted-foreground">
              Shaping the future of fashion in Bangalore since 2024
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2024, Onati Global Institute of Fashion Technology has been at the forefront of fashion education in Bangalore. We started with a vision to create a world-class fashion institute that bridges the gap between creative talent and industry requirements.
                </p>
                <p>
                  Over the years, we have grown into one of the most respected fashion design colleges in Bangalore, producing hundreds of successful designers, stylists, and fashion professionals who are making their mark in the industry.
                </p>
                <p>
                  Our commitment to excellence, combined with industry-focused curriculum and state-of-the-art facilities, has made us the preferred choice for aspiring fashion professionals in Karnataka and beyond.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="text-2xl font-bold text-primary mb-2">Years of Excellence</div>
                <div className="text-sm text-muted-foreground"></div>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-accent/10 to-primary/10">
                <div className="text-2xl font-bold text-primary mb-2">Alumni Network</div>
                <div className="text-sm text-muted-foreground"></div>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="text-2xl font-bold text-primary mb-2">Industry Partners</div>
                <div className="text-sm text-muted-foreground"></div>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-accent/10 to-primary/10">
                <div className="text-2xl font-bold text-primary mb-2">High Placement Record</div>
                <div className="text-sm text-muted-foreground"></div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8">
              <Eye className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the leading fashion technology institute in India, recognized globally for producing innovative designers and fashion professionals who shape the future of the fashion industry.
              </p>
            </Card>
            
            <Card className="p-8">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Founders Mission</h3>
              <p className="text-muted-foreground">
                "We empower individuals with the tools and expertise to thrive in the global fashion landscape. We foster creativity, encourage experimentation, and instill a deep understanding of design principles and industry practices. Through our innovative programs and dedicated faculty, we cultivate the next generation of fashion leaders who will shape the future of the industry."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">World-Class Facilities</h2>
            <p className="text-xl text-muted-foreground">
              State-of-the-art infrastructure for comprehensive fashion education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <facility.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{facility.title}</h3>
                <p className="text-sm text-muted-foreground">{facility.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-3">Design Studios</h4>
              <p className="text-sm text-muted-foreground">
                Spacious studios equipped with professional mannequins, cutting tables, and design tools
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-3">Computer Labs</h4>
              <p className="text-sm text-muted-foreground">
                Latest CAD software for fashion design, illustration, and textile design
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-3">Textile Lab</h4>
              <p className="text-sm text-muted-foreground">
                Complete textile testing and fabric manipulation facilities
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Faculty Highlight */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Expert Faculty</h2>
            <p className="text-xl text-muted-foreground">
              Learn from industry veterans and award-winning designers
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <p className="text-lg text-muted-foreground text-center mb-6">
                Our faculty comprises experienced professionals from the fashion industry, including designers, stylists, and textile experts with extensive industry experience. They bring real-world insights and mentor students to achieve their creative and professional goals.
              </p>
              {/* <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">Faculty Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Years Avg Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Industry Awards</div>
                </div>
              </div> */}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
