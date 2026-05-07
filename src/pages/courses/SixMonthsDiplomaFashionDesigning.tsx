import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { 
  Clock, Award, BookOpen, Palette, Scissors, Users, 
  GraduationCap, Sparkles, PenTool, Shirt, Brush, 
  Target, FileText, Layers
} from "lucide-react";

const SixMonthsDiplomaFashionDesigning = () => {
  const highlights = [
    { icon: Clock, title: "6 Months Duration" },
    { icon: Award, title: "Diploma Certificate" },
    { icon: BookOpen, title: "Comprehensive Curriculum" },
    { icon: Palette, title: "Design Fundamentals" },
    { icon: Scissors, title: "Pattern Making" },
    { icon: Shirt, title: "Garment Construction" },
    { icon: Brush, title: "Surface Ornamentation" },
    { icon: FileText, title: "Portfolio Development" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Best 6 Month Fashion Designing Diploma Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="description" content="Best 6-month fashion designing diploma in Bangalore at OGIFT — design fundamentals, pattern making, garment construction, textile science & portfolio. 4.9★ rated. 100% placement support. Admissions 2026 open!" />
        <meta name="keywords" content="best 6 month fashion designing diploma bangalore, fashion diploma bangalore 2026, 6 month fashion course bangalore, fashion design diploma bangalore, pattern making diploma, garment construction diploma, OGIFT, Onati Global, textile design bangalore, fashion admissions 2026, 100% placement fashion diploma" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/six-months-diploma-fashion-designing" />
        <meta property="og:title" content="6 Months Diploma in Fashion Designing | Onati Global Bangalore" />
        <meta property="og:description" content="Comprehensive 6-month diploma covering design fundamentals, pattern making, garment construction, textile science & portfolio development." />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/six-months-diploma-fashion-designing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="6 Months Fashion Design Diploma | Onati Global Bangalore" />
        <meta name="twitter:description" content="Master fashion design in 6 months. Comprehensive diploma with placement support." />
        <meta name="twitter:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-6">
              6 Months Diploma Program
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Six Months Diploma in Fashion Designing
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              A comprehensive diploma program covering all aspects of fashion design from fundamentals 
              to portfolio development. Master design principles, pattern making, garment construction, 
              textile science, surface ornamentation, and fashion management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="w-full sm:w-auto">
                  Enroll Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn About OGIFT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <highlight.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <p className="font-medium text-sm">{highlight.title}</p>
                </CardContent>
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
              <p>The Six Months Diploma in Fashion Designing at OGIFT Bangalore is the most comprehensive fashion education programme available for students who want to master the full range of fashion design disciplines in a structured, professionally guided environment. Over six months, students progress through seven integrated units covering fashion fundamentals and illustration, pattern making, garment construction, textile science, surface ornamentation, fashion management, and portfolio development — giving you both the creative and technical skills needed to work across the fashion industry.</p>
              <p>This diploma is designed to mirror the learning journey of a professional fashion designer. You begin with the foundations — learning to sketch, understand design elements and principles, and read the industry. You then develop technical proficiency in flat pattern making and draping, move into garment construction across womenswear and menswear, study fabric science and surface embellishment techniques, and conclude with portfolio work that showcases your skills to potential employers. OGIFT faculty bring active industry experience to every session, ensuring the curriculum reflects what Bangalore's fashion employers and design houses actually need from graduates. Classes are conducted in-person at the OGIFT campus in Vinayakanagar, Bengaluru, in English, Hindi, and Kannada.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Is This Course For?</h3>
              <p>This diploma is ideal for students who have completed Class 10 or Class 12 and want to build a complete, professional skill set in fashion design. It is also well-suited for working professionals from non-fashion backgrounds who want to transition into a design or garment technology career, and for tailors, hobbyists, and home-based designers who want to formalise and significantly expand their skills. Students who have completed OGIFT's FASHUP taster programme or Express Mastery courses and want to progress to a full diploma qualification will find this a natural next step.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Career Outcomes</h3>
              <p>Graduates of the Six Months Diploma pursue careers as fashion designers, assistant designers, garment technicians, pattern makers, visual merchandisers, boutique managers, costume designers, and fashion educators. The breadth of the curriculum — spanning design, construction, textiles, and business — makes graduates adaptable to roles in fashion brands, export houses, garment manufacturing, retail, and e-commerce. OGIFT's 100% placement support connects graduates with leading fashion employers across Bangalore and Karnataka, including Fabindia, Raymond, Myntra, Lifestyle, and boutique design studios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Unit 1: Fundamentals of Fashion Design */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Palette className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Unit 1</span>
            </div>
            <h2 className="text-3xl font-bold">Fundamentals of Fashion Design</h2>
            <p className="text-muted-foreground mt-2">Master the core principles and techniques of fashion design</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Introduction to Fashion</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Definition of Fashion</li>
                  <li>• FAD & Classic</li>
                  <li>• Fashion Forecasting</li>
                  <li>• Fashion Terminologies</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Elements of Design</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Line</li>
                  <li>• Shape</li>
                  <li>• Color</li>
                  <li>• Space</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Principles of Design</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Emphasis</li>
                  <li>• Proportion</li>
                  <li>• Balance</li>
                  <li>• Rhythm</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Art Media & Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Shading Pencils</li>
                  <li>• Water & Poster Colors</li>
                  <li>• Fabric Colors & Markers</li>
                  <li>• Shading Techniques</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Basic Sketching</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Shading & Hatching</li>
                  <li>• Cross Hatching</li>
                  <li>• Stippling</li>
                  <li>• Scribbling</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">History of Fashion</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Egypt & Rome</li>
                  <li>• France & England</li>
                  <li>• Japan</li>
                  <li>• Historical Evolution</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Fashion Illustration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 10 & 12 Head Figures</li>
                  <li>• Body Features & Hair</li>
                  <li>• Flat Sketches</li>
                  <li>• Fabric Rendering</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Study of Designers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Sabyasachi, Ritu Kumar</li>
                  <li>• JJ Valaya, Wendell Rodricks</li>
                  <li>• Coco Chanel, Calvin Klein</li>
                  <li>• Giorgio Armani, Marc Jacobs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unit 2: Pattern Making */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Scissors className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Unit 2</span>
            </div>
            <h2 className="text-3xl font-bold">Pattern Making</h2>
            <p className="text-muted-foreground mt-2">Learn professional pattern drafting techniques</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Introduction & Terminologies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Importance of Pattern Making</li>
                  <li>• History of Garment Industry</li>
                  <li>• Methods & Types of Pattern</li>
                  <li>• Tools & Marks/Symbols</li>
                  <li>• Seam Allowance & Fabric Terms</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Body Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Anthropometric Study</li>
                  <li>• Types of Body Measurements</li>
                  <li>• Measuring Methods</li>
                  <li>• Ease for Perfect Fit</li>
                  <li>• Ease in Different Fabrics</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Basic Bodice & Dart</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Basic Bodice Block</li>
                  <li>• Basic Dress Foundation</li>
                  <li>• Dart Manipulation</li>
                  <li>• Slash & Spread Method</li>
                  <li>• Pivot Method</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Indian Wear - Kurta & Blouse</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Plain & Princess Kurta</li>
                  <li>• Collar & Panel Kurti</li>
                  <li>• Plain & Princess-Cut Blouse</li>
                  <li>• Cape & Petal Sleeve Blouse</li>
                  <li>• Peter Pan & Peplum Blouse</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Indian Wear - Skirts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Plain Skirt</li>
                  <li>• Circular Skirt</li>
                  <li>• Flared Skirt</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Kids Wear</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Umbrella Frock</li>
                  <li>• Plain Frock</li>
                  <li>• Jabla</li>
                  <li>• Jumpsuit</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Men's Wear</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Kurta</li>
                  <li>• Pajama</li>
                  <li>• Shirt</li>
                  <li>• Trouser</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Western Wear</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Skirt Block & Trouser</li>
                  <li>• High Waist & Cascade Skirt</li>
                  <li>• Ruffle Skirt & Empire Waist</li>
                  <li>• Reversible Half Jacket</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unit 3: Textile Science */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Layers className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Unit 3</span>
            </div>
            <h2 className="text-3xl font-bold">Textile Science</h2>
            <p className="text-muted-foreground mt-2">Understand fibers, fabrics, and their properties</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Introduction to Textile Fibers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Textile, Fiber, Yarn Terminology</li>
                  <li>• Staple and Filament</li>
                  <li>• Sources & Classification</li>
                  <li>• Physical & Chemical Properties</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Natural & Regenerated Fibers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cellulose: Cotton & Linen</li>
                  <li>• Protein: Silk & Wool</li>
                  <li>• Viscose, Acetate, Modal</li>
                  <li>• Bamboo & Lyocell</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Synthetic Fibers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Nylon & Polyester</li>
                  <li>• Acrylic & Modacrylic</li>
                  <li>• Polypropylene</li>
                  <li>• Spandex & Lycra</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unit 4: Garment Construction */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Shirt className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Unit 4</span>
            </div>
            <h2 className="text-3xl font-bold">Garment Construction</h2>
            <p className="text-muted-foreground mt-2">Master sewing techniques and garment finishing</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Sewing Machine</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Types & Functions</li>
                  <li>• Attachments & Uses</li>
                  <li>• Stitching Practice</li>
                  <li>• Straight, Curves, Corners</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Hand & Machine Stitches</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Basting, Running, Chain</li>
                  <li>• Buttonhole & Hemming</li>
                  <li>• Seam Finishes</li>
                  <li>• French, Lapped, Double Top</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Body Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Average Analysis</li>
                  <li>• Standardizing Measurements</li>
                  <li>• Exercise with 15+ People</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Sleeves & Finishing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Plain, Puff, Bell, Raglan</li>
                  <li>• Peter Pan, Turtle, Mandarin Collar</li>
                  <li>• Yokes with/without Fullness</li>
                  <li>• Patch, Seam, Welt Pockets</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unit 5: Surface Ornamentation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Brush className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Unit 5</span>
            </div>
            <h2 className="text-3xl font-bold">Surface Ornamentation</h2>
            <p className="text-muted-foreground mt-2">Learn hand embroidery and traditional Indian techniques</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Hand Embroidery Stitches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Master 50+ embroidery stitches including:</p>
                  <div className="grid grid-cols-2 gap-1">
                    <span>• Running & Chain Stitch</span>
                    <span>• Blanket & French Knot</span>
                    <span>• Stem & Satin Stitch</span>
                    <span>• Cross & Lazy Daisy</span>
                    <span>• Split & Fly Stitch</span>
                    <span>• Mirror Work</span>
                    <span>• Herringbone</span>
                    <span>• Bullion Knot</span>
                    <span>• Chevron Stitch</span>
                    <span>• Woven Wheel</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Traditional Indian Embroidery</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Kasuthi</strong> - Karnataka traditional embroidery</li>
                  <li>• <strong>Mirror Work</strong> - Reflective embellishment</li>
                  <li>• <strong>Chikankari</strong> - Lucknow white thread work</li>
                  <li>• <strong>Phulkari</strong> - Punjab floral embroidery</li>
                  <li>• <strong>Kantha</strong> - Bengal running stitch quilting</li>
                  <li>• <strong>Kashida</strong> - Kashmir chain stitch</li>
                  <li>• <strong>Patch Work</strong> - Fabric assemblage</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unit 6: Fashion Management */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Unit 6</span>
            </div>
            <h2 className="text-3xl font-bold">Fashion Management</h2>
            <p className="text-muted-foreground mt-2">Understand the business side of fashion</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Fashion Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Fashion Plan</li>
                  <li>• Forecasting Process</li>
                  <li>• Primary, Secondary, Tertiary</li>
                  <li>• Tracking Sales & Competition</li>
                  <li>• Demographics & Lifestyles</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Fashion Merchandising</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Roles & Responsibilities</li>
                  <li>• Apparel Merchandising</li>
                  <li>• Production Workflow</li>
                  <li>• Essential Knowledge</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Fashion Retailing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• History & Scope</li>
                  <li>• Types: Domestic & International</li>
                  <li>• Techniques & Distribution</li>
                  <li>• Franchisee & Retail Merchandiser</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Unit 7: Portfolio & Collection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Unit 7</span>
            </div>
            <h2 className="text-3xl font-bold">Fashion Portfolio & Design Collection</h2>
            <p className="text-muted-foreground mt-2">Create your professional portfolio and showcase collection</p>
          </div>
          <Card className="max-w-3xl mx-auto hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Develop an individual portfolio presentation based on a theme of your choice:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Portfolio Components:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Story Board Development</li>
                      <li>• Mood Board Creation</li>
                      <li>• Color Board Design</li>
                      <li>• Texture Board Assembly</li>
                      <li>• Swatch Board Compilation</li>
                      <li>• Logo Design</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Technical Documentation:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Working Drawings</li>
                      <li>• Spec Sheets</li>
                      <li>• Cost Sheets</li>
                      <li>• Drafting & Draping</li>
                      <li>• Flat Pattern Method</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    Final Project: Produce one complete collection from your portfolio and present it as a fashion show!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Course Details & Skills */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Skills You'll Develop</h2>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Fashion Design Fundamentals & History",
                  "Fashion Illustration & Fabric Rendering",
                  "Professional Pattern Drafting",
                  "Garment Construction & Finishing",
                  "Textile Science & Fiber Identification",
                  "50+ Hand Embroidery Techniques",
                  "Traditional Indian Embroidery",
                  "Fashion Forecasting & Merchandising",
                  "Fashion Retailing Strategies",
                  "Portfolio Development & Presentation",
                  "Collection Design & Fashion Show",
                ].map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">6 Months</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-semibold">Diploma</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Certificate</span>
                  <span className="font-semibold">Diploma Certificate</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Mode</span>
                  <span className="font-semibold">Offline</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Units Covered</span>
                  <span className="font-semibold">7 Comprehensive Units</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Final Project</span>
                  <span className="font-semibold">Fashion Show</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Related Programmes and Institute Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            The 6-month diploma sits between OGIFT's introductory and advanced programmes. Students new to fashion often begin with the free <Link to="/courses/fashup-free-taster-sessions" className="text-primary underline hover:no-underline font-medium">FASHUP 10-day taster</Link> before enrolling. For the most comprehensive qualification, the <Link to="/courses/one-year-advanced-diploma-fashion-designing" className="text-primary underline hover:no-underline font-medium">1-Year Advanced Diploma</Link> covers additional advanced topics and includes an industry project. Short-term alternatives include the <Link to="/courses/fashion-illustration" className="text-primary underline hover:no-underline font-medium">Fashion Illustration course</Link> and other 1-month Express Mastery programmes. Apply through the <Link to="/admissions" className="text-primary underline hover:no-underline font-medium">Admissions page</Link>, learn about OGIFT on the <Link to="/about" className="text-primary underline hover:no-underline font-medium">About page</Link>, or <Link to="/verify" className="text-primary underline hover:no-underline font-medium">verify an OGIFT certificate</Link>.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Fashion Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our comprehensive 6-month diploma program and transform your passion into a professional career in fashion design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="w-5 h-5 mr-2" />
                Enroll Now
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn About OGIFT
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SixMonthsDiplomaFashionDesigning;
