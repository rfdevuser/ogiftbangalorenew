import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Clock, 
  Globe, 
  Sparkles, 
  Monitor, 
  BookOpen, 
  Scissors, 
  Palette, 
  Users,
  Video,
  Headphones,
  CheckCircle,
  Star,
  MessageCircle,
  Play,
  Calendar,
  Award
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ThreeMonthsOnlineFashionCourse = () => {
  const courseModules = [
    {
      title: "Introduction to Fashion",
      icon: Palette,
      topics: [
        "Definition of fashion designing",
        "Types of fashion designing & collection ranges",
        "Fashion terminologies",
        "Design concept research",
        "From concept to collection",
        "History of fashion"
      ]
    },
    {
      title: "Fundamentals of Fashion",
      icon: BookOpen,
      topics: [
        "Elements of Design: Line, Shape, Color Theory, Space",
        "Principles of Design: Balance, Proportion, Emphasis, Harmony",
        "Basic sketching techniques & shading",
        "Hatching, cross-hatching, stippling, scribbling",
        "2D to 3D look converting",
        "Shading in folds, frills, gathers & pleats"
      ]
    },
    {
      title: "Fashion Illustration",
      icon: Sparkles,
      topics: [
        "Mechanical croqui development",
        "9-head croqui with three different poses",
        "Flat sketch for women's & men's wear",
        "Fabric rendering with different textures"
      ]
    },
    {
      title: "Textile Science & Fabric Identification",
      icon: Monitor,
      topics: [
        "Fibre, Yarn & Fabric fundamentals",
        "Types of natural & man-made fibres",
        "Types of yarns and fabrics",
        "Fabric finishes"
      ]
    },
    {
      title: "Surface Ornamentation",
      icon: Star,
      topics: [
        "Basic embroidery techniques",
        "Traditional embroidery styles",
        "Fabric painting methods"
      ]
    },
    {
      title: "Pattern Making",
      icon: Scissors,
      topics: [
        "Women's Wear: Blouses (Plain, Princess cut, Collar with puff sleeve, Designer)",
        "Kurtas: Plain, Princess cut, Collar, Alia cut styles",
        "Pajamas: Plain, Semi patiyal, Trouser style, Chudidar",
        "Gowns: Simple & Yoke umbrella style",
        "Kid's Wear: Jabla, Umbrella/Gathered/A-line frocks, Skirts",
        "Men's Wear: Kurta, Pajama, Shirt, Trouser"
      ]
    },
    {
      title: "Garment Construction",
      icon: Users,
      topics: [
        "Operating sewing machine",
        "Body measurement techniques",
        "Fabric type & consumption knowledge",
        "Basic hand stitches: Basting, running, chain, buttonhole, hemming",
        "Seam types & finishes: Plain, flat fell, French, lapped",
        "Tucks, pleats, neck finishes & zipper attachment"
      ]
    },
    {
      title: "Boutique Management & Marketing",
      icon: GraduationCap,
      topics: [
        "Day-to-day boutique operations",
        "Inventory management & supplier handling",
        "Visual merchandising & store layout",
        "Branding & marketing strategies",
        "Portfolio making & presentation"
      ]
    }
  ];

  const courseHighlights = [
    {
      icon: Globe,
      title: "100% Online",
      description: "Learn from anywhere in the world with flexible scheduling"
    },
    {
      icon: Headphones,
      title: "Multi-Lingual Support",
      description: "Available in English, Hindi & Kannada"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Learning",
      description: "Personalized AI assistant for instant doubt resolution"
    },
    {
      icon: Video,
      title: "Live & Recorded Sessions",
      description: "58+ hours of contact time with video resources"
    },
    {
      icon: MessageCircle,
      title: "1-on-1 Mentorship",
      description: "Personal guidance from industry expert faculty"
    },
    {
      icon: Award,
      title: "Industry Certificate",
      description: "Vocational Skill Development. Entrepreneurial Venture Support. Financial Independence.;"
    }
  ];

  const learningFormat = [
    { label: "Live Video Sessions", value: "20+ min per topic" },
    { label: "Generated Video Content", value: "5+ min per module" },
    { label: "PPT Presentations", value: "Comprehensive slides" },
    { label: "Assignments", value: "Practical projects" },
    { label: "Non-Contact Hours", value: "68 hours self-study" },
    { label: "Reference Books", value: "Industry-standard materials" }
  ];

  return (
    <>
      <Helmet>
        <title>Best Online Fashion Design Course India 2026 | OGIFT | 3 Months AI-Powered</title>
        <meta name="description" content="Best online fashion design course in India at OGIFT — 3-month AI-powered, multi-lingual (English, Hindi, Kannada). Pattern making, garment construction, illustration & boutique management. 4.9★ rated. Admissions 2026 open!" />
        <meta name="keywords" content="best online fashion design course india 2026, online fashion course bangalore, 3 month online fashion designing, AI powered fashion course, multilingual fashion course hindi kannada, fashion design online india, pattern making online course, OGIFT online course, Onati Global online, fashion admissions 2026" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/onlinecourse" />
        <meta property="og:title" content="3 Months Online Fashion Designing Course | AI-Powered | Onati Global" />
        <meta property="og:description" content="Transform your fashion dreams into reality with our comprehensive 3-month online course. AI-powered learning, multi-lingual support, and industry-recognized certification." />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/onlinecourse" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="3 Months Online Fashion Course | Onati Global Bangalore" />
        <meta name="twitter:description" content="AI-powered, multi-lingual online fashion designing course. Learn pattern making, illustration & boutique management in 3 months." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                  <Globe className="w-4 h-4 mr-1.5" />
                  100% Online
                </Badge>
                <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  AI-Powered
                </Badge>
                <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                  <Headphones className="w-4 h-4 mr-1.5" />
                  Multi-Lingual
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                3 Months Online{' '}
                <span className="text-primary">Fashion Designing</span> Course
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Transform your passion for fashion into professional skills with our comprehensive AI-powered online course. 
                Learn in English, Hindi, or Kannada with personalized mentorship.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Button size="lg" className="px-8 py-6 text-lg" asChild>
                  <a href="#enroll">
                    <Play className="w-5 h-5 mr-2" />
                    Start Learning Today
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg" asChild>
                  <a href="#curriculum">View Curriculum</a>
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>3 Months Duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-primary" />
                  <span>58+ Hours Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Flexible Schedule</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose This Course */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Our Online Course?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the future of fashion education with cutting-edge technology and personalized learning
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {courseHighlights.map((highlight, index) => (
                <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300 hover:border-primary/30 bg-card">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <highlight.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground text-sm">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Format */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Comprehensive Learning Format
                </h2>
                <p className="text-muted-foreground">
                  A blend of live sessions, recorded content, and practical assignments
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningFormat.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section id="curriculum" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete Course Curriculum
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                8 comprehensive modules covering everything from fashion fundamentals to boutique management
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {courseModules.map((module, index) => (
                <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300 bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <module.icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Features Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    AI-Powered Experience
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Personalized Learning with AI Assistant
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Our intelligent AI assistant is available 24/7 to answer your questions, provide feedback on your work, 
                    and guide you through complex fashion concepts in your preferred language.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Instant doubt resolution in English, Hindi & Kannada",
                      "Personalized learning path recommendations",
                      "Real-time feedback on assignments",
                      "Pattern making guidance & troubleshooting",
                      "Fashion trend analysis & insights"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Fashion AI Assistant</p>
                      <p className="text-sm text-muted-foreground">Available 24/7</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground italic">
                        "How do I create a princess cut blouse pattern?"
                      </p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-sm text-foreground">
                        Great question! To create a princess cut blouse, start with your basic bodice block. 
                        I'll guide you step-by-step through the dart manipulation process...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Details */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-primary/20 shadow-xl">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl md:text-3xl">Course Details</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Clock className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Duration</p>
                          <p className="font-semibold text-foreground">3 Months</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Video className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Contact Hours</p>
                          <p className="font-semibold text-foreground">58+ Hours</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Self-Study</p>
                          <p className="font-semibold text-foreground">68+ Hours</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Globe className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Mode</p>
                          <p className="font-semibold text-foreground">100% Online</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Headphones className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Languages</p>
                          <p className="font-semibold text-foreground">English, Hindi, Kannada</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Award className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Certificate</p>
                          <p className="font-semibold text-foreground">Industry Recognized</p>
                        </div>
                      </div>
                        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Award className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold text-lg">Fees</p>
                          <p className="font-semibold text-foreground text-lg">Rs. 49,999 /-</p>
                          <p className="font-semibold text-lg"> Free Kit Worth Upto Rs. 10,000 /- </p>
                        </div>
                      </div>
                   
            
                    </div>
                  </div>
                  
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Related Pages at OGIFT Bangalore</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link to="/" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Home</span></Link>
              <Link to="/about" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">About OGIFT</span></Link>
              <Link to="/quicktour" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Quick Tour</span></Link>
              <Link to="/interactive-training" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Interactive Training</span></Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="enroll" className="py-20 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Start Your Fashion Journey?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of students who have transformed their passion into profession. 
              Enroll now and get instant access to our AI-powered learning platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg" asChild>
                <a href="/admissions">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Enroll Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/courses">View All Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ThreeMonthsOnlineFashionCourse;
