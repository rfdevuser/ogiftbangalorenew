import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Award, Scissors, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import heroImage from '@/assets/hero-courses.jpg';

const PatternMakingWesternAdvancedCourse = () => {
  const topics = [
    {
      title: 'Skirt Block',
      description: 'Master the fundamental skirt block pattern as the foundation for all skirt variations.'
    },
    {
      title: 'Trouser',
      description: 'Create professional trouser patterns with proper fit and construction techniques.'
    },
    {
      title: 'High Waist',
      description: 'Draft flattering high waist patterns for skirts and trousers with proper rise.'
    },
    {
      title: 'Low Waist',
      description: 'Learn low waist pattern techniques for contemporary fashion styles.'
    },
    {
      title: 'Cascade Skirt',
      description: 'Create elegant cascade skirt patterns with dramatic draped effects.'
    },
    {
      title: 'Ruffle Skirt',
      description: 'Master ruffle construction with proper fullness and tier calculations.'
    },
    {
      title: 'Empire Waist',
      description: 'Draft empire waist patterns with raised waistline for elegant silhouettes.'
    },
    {
      title: 'Reversible Half Jacket',
      description: 'Create versatile reversible jacket patterns with professional finishing.'
    }
  ];

  const highlights = [
    'Creative Design',
    'Pattern Making',
    'Pattern Visualization',
    'Introduction to Pattern Development'
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Best Western Pattern Making Course Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="description" content="Best advanced Western pattern making course in Bangalore at OGIFT — skirt blocks, trousers, cascade skirts, empire waist & reversible jacket. 1-month, 4.9★ rated. 100% placement. Admissions 2026 open!" />
        <meta name="keywords" content="best western pattern making course bangalore, advanced western pattern making bangalore 2026, skirt block pattern course, trouser pattern making bangalore, cascade skirt pattern, fashion design course bangalore, OGIFT, Onati Global, western garment course, admissions 2026" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/pattern-making-western-advanced" />
        <meta property="og:title" content="Advanced Western Pattern Making Course | Onati Global Bangalore" />
        <meta property="og:description" content="Master 8 essential Western garment patterns in 1 month. Skirt blocks, trousers, cascade skirts, empire waist & more. Certificate included." />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/pattern-making-western-advanced" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Advanced Western Pattern Making | Onati Global Bangalore" />
        <meta name="twitter:description" content="Master 8 Western garment patterns in 1 month. Professional certificate included." />
        <meta name="twitter:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
      </Helmet>
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
              Pattern Making Western (Advanced)
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Dive into the fascinating world of Pattern Creation and Development of Western Clothing. Master advanced techniques for contemporary fashion.
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
              Master Western garment pattern making at professional level
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-primary">
                <Sparkles className="h-10 w-10 mx-auto mb-4 text-primary" />
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
            <h2 className="text-4xl font-bold mb-4">Western Styles You'll Master</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn to create patterns for 8 essential Western garment types
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
                  'Create professional skirt and trouser blocks',
                  'Master waistline variations from high to low rise',
                  'Draft cascade and ruffle skirts with proper fullness',
                  'Design empire waist patterns for elegant silhouettes',
                  'Construct reversible jacket patterns',
                  'Apply advanced Western pattern making techniques'
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
                  <span className="text-muted-foreground">Garment Types</span>
                  <span className="font-semibold">8 Styles</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Total Fees</span>
                  <span className="font-semibold">₹36,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Fashup Discount (10 Hours Free)</span>
                  <span className="font-semibold text-red-600">- ₹21,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">To Pay</span>
                  <span className="font-semibold text-primary text-lg">₹15,000</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">Extras</span>
                  <span className="font-semibold">Required material list provided</span>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link to="/courses/pattern-making-basic" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Pattern Making Basic</span></Link>
            <Link to="/courses/pattern-making-blouses-advanced" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Blouses Pattern Making</span></Link>
            <Link to="/courses/pattern-making-kids-clothing" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Kids Clothing Patterns</span></Link>
            <Link to="/courses/design-process-pattern-making-3months" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Design Process & Pattern Making</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatternMakingWesternAdvancedCourse;
