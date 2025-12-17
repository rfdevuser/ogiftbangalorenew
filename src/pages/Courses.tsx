import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, BookOpen, Award, Users } from 'lucide-react';
import heroImage from '@/assets/hero-courses.jpg';
import { Link } from 'react-router-dom';

const Courses = () => {
  const courses = [
    {
       title: 'FASHUP - Experience Our FREE Taster Sessions',
      duration: '10 Days',
      category: 'Certificate',
      description: 'There is no better way to start your fashion journey than experiencing the OGIFT Way of Intrducing you to the Truely Fascination world of Fashion.',
      highlights: ['Have Fun Learning', 'Meet Like Minded Enthusiasts', 'Seek Advice from our Trained Faculty', 'Take The Plunge'],
      Fees: "Absolutely FREE"
    },
    {
       title: 'Express Mastery Month - Fashion Illustration',
      duration: '1 Month',
      category: 'Certificate',
      description: 'Acquire a good foundation to understanding of skills required to visually communicate your designs.',
      highlights: ['Figure Drawing & Proportions', 'Garment Rendering', 'Technical Drawing', 'Media & Color'],
      Fees: "Only Rs. 12,000 "
    },
    {
       title: 'Express Mastery Month - Pattern Making (Basic)',
      duration: '1 Month',
      category: 'Certificate',
      description: 'Dive into the fascinating world of Pattern Creation and Development.',
      highlights: ['Creative Design', 'Pattern Making', 'Pattern Visualization', 'Basics of Pattern Development'],
      Fees: "Only Rs. 12,000 "
    },
     {
       title: 'Express Mastery Month - Pattern Making Blouses (Advanced)',
      duration: '1 Month',
      category: 'Certificate',
      description: 'Dive into the fascinating world of Pattern Creation and Development of Blouses.',
      highlights: ['Creative Design', 'Pattern Making', 'Pattern Visualization', 'Introduction to Pattern Development'],
      Fees: "Only Rs. 15,000 "
    },
      {
       title: 'Express Mastery Month - Pattern Making Western (Advanced)',
      duration: '1 Month',
      category: 'Certificate',
      description: 'Dive into the fascinating world of Pattern Creation and Development of Western Clothing',
      highlights: ['Creative Design', 'Pattern Making', 'Pattern Visualization', 'Introduction to Pattern Development'],
      Fees: "Rs. 15,000 "
    },
      {
       title: 'Express Mastery Month - Art of Garment Foundation',
      duration: '1 Month',
      category: 'Certificate',
      description: 'Learn the basics of essential skills and technical knowledge needed to construct, fit, and finish clothing.',
      highlights: ['Pattern Making & Grading', 'Fabric Science', 'Sewing Techniques', 'Fit & Alterations'],
      Fees: "Rs. 12,000 "
    },
      {
       title: 'Express Mastery Month -Fabric Knowledge and Textile Designing',
      duration: '1 Month',
      category: 'Certificate',
      description: 'This course focusses on the material science of textiles and the creative processes involved in designing and producing fabrics.',
      highlights: ['Fiber to Fabric', 'Weaving & Knitting Structures', 'CAD Textile Design', 'Printing & Finishing'],
      Fees: "Rs. 12,000 "
    },
      {
       title: 'Express Mastery Month - Draping Technology',
      duration: '1 Month',
      category: 'Certificate',
      description: 'This fabulous course will introduce you to the fundamentals of Draping Technology course that teaches the three-dimensional method of pattern creation by manipulating fabric directly on a dress form.',
      highlights: ['Block Development', 'Design Interpretation', 'Muslin Manipulation', 'Transfer To Paper'],
      Fees: "Rs. 12,000 "
    },
      {
       title: 'Express Mastery Month - Digital Portfolio Making',
      duration: '1 Month',
      category: 'Certificate',
      description: 'This course will focus on strategically curating, designing, and presenting creative work online to appeal to potential employers or clients.',
      highlights: ['Platform Selection & Structure', 'Visual Presentation & Curation', 'Content Strategy', 'Digital Tools & Interactivity'],
      Fees: "Rs. 12,000 "
    },
      {
       title: 'Express Mastery Month - Graphic Designing for Fashion',
      duration: '1 Month',
      category: 'Certificate',
      description: 'This course course focuses on applying core graphic design principles specifically within the fashion industry context, from branding to marketing materials.',
      highlights: ['Fashion Branding & Identity', 'Layout & Collateral Design', 'Digital Marketing Assets', 'Software Proficiency'],
      Fees: "Rs. 15,000 "
    },
      {
       title: 'Express Mastery Month - Fashion Designing and Boutique Management',
      duration: '1 Month',
      category: 'Certificate',
      description: 'With this course, you will get introduced to the business and retail skills needed to successfully launch, operate, and grow a small fashion retail enterprise.',
      highlights: ['Inventory & Merchandising', 'Financial Management', 'Customer Experience & Sales', 'Legal & Operations'],
      Fees: "Rs. 15,000 "
    },
      {
       title: 'Express Mastery Month - Fashion Styling',
      duration: '1 Month',
      category: 'Certificate',
      description: 'This course will introduce you to the visual and creative skills necessary to select and coordinate clothing and accessories for photoshoots, editorials, and personal clients.',
      highlights: ['Image Conception & Mood Boards', 'Wardrobe Curation & Sourcing', 'Editorial & Commercial Styling', 'Client & Body Analysis'],
      Fees: "Rs. 10,000 "
    },
      {
       title: 'Express Mastery Month - Pattern Making for Kids Clothing',
      duration: '1 Month',
      category: 'Certificate',
      description: 'Dive into the fascinating world of Pattern Creation and Development of Kids Clothing',
      highlights: ['Creative Design', 'Pattern Making', 'Pattern Visualization', 'Introduction to Pattern Development'],
      Fees: "Rs. 10,000 "
    },
  {
      title: 'Short Certificate Course in Pattern Making and Boutique Management (PMBM) - The 3 Months Capsule Course',
      duration: '3 Months',
      category: 'Certificate',
      description: 'Dive into the world of fashion with our 3-Months Certificate Course in Fashion Designing. Gain hands-on skills in design fundamentals, fabric knowledge, and garment construction, preparing you for roles as a fashion designer, stylist, or textile designer.',
      highlights: ['Creative Design', 'Pattern Making', 'CAD Design', 'Portfolio Development'],
      Fees : "Call Institute to get details"
    },
     {
      title: 'Short Certificate Course in Design Process and Pattern Making (DPPM) - The 3 Months Capsule Course',
      duration: '3 Months',
      category: 'Certificate',
      description: 'Dive into the world of fashion with our 3-Months Certificate Course in Fashion Designing. Gain hands-on skills in design fundamentals, fabric knowledge, and garment construction, preparing you for roles as a fashion designer, stylist, or textile designer.',
      highlights: ['Creative Design', 'Pattern Making', 'CAD Design', 'Portfolio Development'],
      Fees : "Call Institute to get details"
    },
      {
      title: 'Short Certificate Course in Design Pattern Making, Design Process and Portfolio (DPPMP) - The 3 Months Capsule Course',
      duration: '3 Months',
      category: 'Certificate',
      description: 'Dive into the world of fashion with our 3-Months Certificate Course in Fashion Designing. Gain hands-on skills in design fundamentals, fabric knowledge, and garment construction, preparing you for roles as a fashion designer, stylist, or textile designer.',
      highlights: ['Creative Design', 'Pattern Making', 'CAD Design', 'Portfolio Development'],
      Fees : "Call Institute to get details"
    },
   
    {
      title: 'Six Months Diploma in Fashion Designing',
      duration: '6 Months',
      category: 'Diploma',
      description: 'Dive into the world of fashion with our 6-month Diploma in Fashion Designing. Gain hands-on skills in design fundamentals, fabric knowledge, and garment construction, preparing you for roles as a fashion designer, stylist, or textile designer.',
      highlights: ['Creative Design', 'Pattern Making', 'CAD Design', 'Portfolio Development'],
      Fees : "Call Institute to get details"
    },
    {
      title: 'One Year Advanced Diploma in Fashion Designing',
      duration: '1 Year',
      category: 'Advanced Diploma',
      description: 'Technical program focusing on garment construction, production planning, quality control, and textile science.',
      highlights: ['Production Planning', 'Quality Control', 'Textile Science', 'Manufacturing'],
      Fees : "Call Institute to get details"
    },
   
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-background/60 to-background/40" />
        </div>
        
        <div className="container mx-auto px-4  z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Fashion Design Courses
            </h1>
         
            <p className="text-xl ">
              Industry-recognized programs designed to transform your creative vision into professional expertise
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Courses</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our range of professional fashion courses tailored for different career paths
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary bg-muted">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                    {course.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{course.description}</p>

                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">Key Highlights:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {course.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-muted-foreground mb-4">Fees : {course.Fees}</p>
               
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Courses Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Courses?</h2>
            <p className="text-xl text-muted-foreground">Industry-aligned curriculum with hands-on experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'Expert Faculty', description: 'Learn from industry professionals with years of experience' },
              { icon: Users, title: 'Small Batches', description: 'Personalized attention with limited students per class' },
              { icon: Award, title: 'Certifications', description: 'Industry-recognized diplomas and certificates' },
              { icon: Clock, title: 'Flexible Timings', description: 'Weekend and evening batches available' },
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4">Ready to Enroll?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Start your fashion career with India's leading fashion technology institute in Bangalore
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

export default Courses;
