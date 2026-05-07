import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Clock, Award, BookOpen, Palette, Scissors, Users, 
  GraduationCap, Sparkles, PenTool, Shirt, Brush, 
  Target, FileText, Layers, Ruler, TrendingUp, Store,
  Camera, Laptop, Globe, Star
} from "lucide-react";

const OneYearAdvancedDiplomaFashionDesigning = () => {
  const highlights = [
    { icon: Clock, title: "1 Year Duration" },
    { icon: Award, title: "Advanced Diploma" },
    { icon: BookOpen, title: "12 Comprehensive Modules" },
    { icon: Palette, title: "Design Mastery" },
    { icon: Scissors, title: "Advanced Pattern Making" },
    { icon: Shirt, title: "Complete Garment Construction" },
    { icon: Brush, title: "Surface Ornamentation" },
    { icon: Ruler, title: "Draping Technology" },
    { icon: Layers, title: "Textile Science" },
    { icon: TrendingUp, title: "Fashion Management" },
    { icon: Store, title: "Boutique Management" },
    { icon: FileText, title: "Portfolio & Fashion Show" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "One Year Advanced Diploma in Fashion Designing",
    "description": "A comprehensive one-year advanced diploma in fashion designing at OGIFT Bangalore covering design process, pattern making, garment construction, styling, portfolio development and industry placement support.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Onati Global Institute of Fashion Technology",
      "alternateName": "OGIFT Bangalore",
      "url": "https://www.ogiftbangalore.com"
    },
    "timeRequired": "P1Y",
    "educationalLevel": "Advanced",
    "inLanguage": ["en", "hi", "kn"],
    "offers": {
      "@type": "Offer",
      "price": "118300",
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
        <title>Best 1 Year Advanced Fashion Designing Diploma Bangalore 2026 | OGIFT | Admissions Open</title>
        <meta name="title" content="Best One Year Advanced Diploma in Fashion Designing Bangalore 2026 | Onati Global Institute" />
        <meta name="description" content="Best 1-year advanced fashion designing diploma in Bangalore at OGIFT — design, pattern making, garment construction, styling, portfolio & 100% placement support. 4.9★ rated. Admissions 2026 open!" />
        <meta name="keywords" content="best one year fashion diploma bangalore, advanced fashion designing diploma bangalore 2026, 1 year fashion design diploma, fashion degree bangalore, advanced fashion course bangalore, fashion designing certificate bangalore, 100% placement fashion diploma, OGIFT, Onati Global, fashion admissions 2026" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/courses/one-year-advanced-diploma-fashion-designing" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/courses/one-year-advanced-diploma-fashion-designing" />
        <meta property="og:title" content="One Year Advanced Diploma in Fashion Designing | OGIFT Bangalore" />
        <meta property="og:description" content="OGIFT Bangalore's most comprehensive fashion program. One year advanced diploma covering design, pattern making, garment construction, portfolio and placement support." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/courses/one-year-advanced-diploma-fashion-designing" />
        <meta name="twitter:title" content="One Year Advanced Diploma in Fashion Designing | OGIFT Bangalore" />
        <meta name="twitter:description" content="OGIFT Bangalore's most comprehensive fashion diploma. One year of design, pattern making, garment construction, portfolio and placement support." />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium mb-6">
              1 Year Advanced Diploma Program
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              One Year Advanced Diploma in Fashion Designing
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Our most comprehensive fashion design program covering everything from design fundamentals 
              to advanced pattern making, garment construction, textile science, surface ornamentation, 
              draping technology, fashion management, and culminating in a professional portfolio 
              with a fashion show presentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                {/* <Button size="lg" className="w-full sm:w-auto">
                  Enroll Now
                </Button> */}
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 pb-4">
                  <highlight.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-medium text-xs">{highlight.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Module 1: Fundamentals of Fashion Design */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Palette className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 1</span>
            </div>
            <h2 className="text-3xl font-bold">Fundamentals of Fashion Design</h2>
            <p className="text-muted-foreground mt-2">Build a strong foundation in design principles and fashion history</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Introduction to Fashion</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Definition of Fashion</li>
                  <li>• FAD vs Classic</li>
                  <li>• Fashion Forecasting</li>
                  <li>• Fashion Terminologies</li>
                  <li>• Collection Ranges</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Elements of Design</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Line & Shape</li>
                  <li>• Color Theory</li>
                  <li>• Space & Form</li>
                  <li>• Texture & Pattern</li>
                  <li>• Color Harmonies</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Principles of Design</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Emphasis & Focal Point</li>
                  <li>• Proportion & Scale</li>
                  <li>• Balance & Symmetry</li>
                  <li>• Rhythm & Movement</li>
                  <li>• Harmony & Unity</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">History of Fashion</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ancient Egypt & Rome</li>
                  <li>• France & England</li>
                  <li>• Japan & Asia</li>
                  <li>• Modern Fashion Evolution</li>
                  <li>• Contemporary Trends</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 2: Fashion Illustration */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <PenTool className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 2</span>
            </div>
            <h2 className="text-3xl font-bold">Fashion Illustration & Sketching</h2>
            <p className="text-muted-foreground mt-2">Master the art of fashion figure drawing and rendering</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Art Media & Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Shading Pencils</li>
                  <li>• Staedtler Color Pencils</li>
                  <li>• Water & Poster Colors</li>
                  <li>• Fabric Colors & Markers</li>
                  <li>• Medium Techniques</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Basic Sketching</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Shading Techniques</li>
                  <li>• Hatching & Cross Hatching</li>
                  <li>• Stippling & Scribbling</li>
                  <li>• Highlight & Shadow</li>
                  <li>• Mid Tone Rendering</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Fashion Figures</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 9, 10 & 12 Head Croqui</li>
                  <li>• Mechanical Croqui</li>
                  <li>• Standing & Moving Poses</li>
                  <li>• Face & Body Features</li>
                  <li>• Hair Styling</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Fabric Rendering</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cotton, Silk, Fur</li>
                  <li>• Net, Leather, Velvet</li>
                  <li>• Denim, Corduroy</li>
                  <li>• Georgette, Chiffon</li>
                  <li>• Lace & Embroidered</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow col-span-full md:col-span-2 lg:col-span-4">
              <CardHeader>
                <CardTitle className="text-lg">Flat Sketches & Technical Drawings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-2">Sleeves</p>
                    <p>All types including puff, bell, raglan, kimono</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Collars</p>
                    <p>Peter pan, turtle, mandarin, shawl, formal</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Necklines</p>
                    <p>Various styles for women & men</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Garments</p>
                    <p>Trousers, skirts, shirts, dresses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 3: Pattern Making - Foundation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Scissors className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 3</span>
            </div>
            <h2 className="text-3xl font-bold">Pattern Making - Foundation</h2>
            <p className="text-muted-foreground mt-2">Learn pattern drafting fundamentals and techniques</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Introduction & Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Importance of Pattern Making</li>
                  <li>• History of Garment Industry</li>
                  <li>• Methods & Types of Pattern</li>
                  <li>• Pattern Making Tools</li>
                  <li>• Marks & Symbols</li>
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
                  <li>• Types of Measurements</li>
                  <li>• Measuring Methods</li>
                  <li>• Standardization</li>
                  <li>• Ease for Perfect Fit</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Bodice & Dart Manipulation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Basic Bodice Block</li>
                  <li>• Basic Dress Foundation</li>
                  <li>• What is Dart?</li>
                  <li>• Slash & Spread Method</li>
                  <li>• Pivot Method</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 4: Pattern Making - Women's Wear */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Scissors className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 4</span>
            </div>
            <h2 className="text-3xl font-bold">Pattern Making - Women's Wear</h2>
            <p className="text-muted-foreground mt-2">Master pattern drafting for complete women's wardrobe</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Blouses (8 Styles)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Plain Blouse</li>
                  <li>• Princess-Cut Blouse</li>
                  <li>• Boat Neck Blouse</li>
                  <li>• Cape Sleeve Blouse</li>
                  <li>• Petal & Puff Sleeve</li>
                  <li>• Peter Pan Collar</li>
                  <li>• Peplum Blouse</li>
                  <li>• Designer Blouse</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Kurtas (4 Styles)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Plain Kurta</li>
                  <li>• Princess Cut Kurta</li>
                  <li>• Collar Kurta</li>
                  <li>• Alia Cut Kurta</li>
                  <li>• Panel Kurti</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Bottoms (7 Styles)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Plain Pajama</li>
                  <li>• Semi Patiala</li>
                  <li>• Trouser Style</li>
                  <li>• Churidar</li>
                  <li>• Plain Skirt</li>
                  <li>• Circular Skirt</li>
                  <li>• Flared Skirt</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Gowns & Dresses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Simple Gown</li>
                  <li>• Yoke with Umbrella Style</li>
                  <li>• Empire Waist</li>
                  <li>• A-Line Dress</li>
                  <li>• Fitted Bodice Gown</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 5: Pattern Making - Western, Kids & Men's */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Scissors className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 5</span>
            </div>
            <h2 className="text-3xl font-bold">Pattern Making - Western, Kids & Men's Wear</h2>
            <p className="text-muted-foreground mt-2">Comprehensive pattern making for all categories</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Western Wear</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Skirt Block</li>
                  <li>• Trouser Pattern</li>
                  <li>• High Waist Styles</li>
                  <li>• Cascade & Ruffle Skirt</li>
                  <li>• Empire Waist</li>
                  <li>• Reversible Half Jacket</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Kids Wear</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Jabla</li>
                  <li>• Umbrella Frock</li>
                  <li>• Gathered Frock</li>
                  <li>• A-Line Frock</li>
                  <li>• Plain Frock</li>
                  <li>• Gathered & Pleated Skirt</li>
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
                  <li>• Formal Shirt</li>
                  <li>• Casual Shirt</li>
                  <li>• Trouser</li>
                  <li>• Jacket Basics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 6: Garment Construction */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Shirt className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 6</span>
            </div>
            <h2 className="text-3xl font-bold">Garment Construction</h2>
            <p className="text-muted-foreground mt-2">Master sewing techniques and professional finishing</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Sewing Machine Mastery</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Types of Machines</li>
                  <li>• Functions & Attachments</li>
                  <li>• Stitching on Paper</li>
                  <li>• Stitching on Fabric</li>
                  <li>• Straight, Curves, Corners</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Hand Stitches</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Basting & Running</li>
                  <li>• Chain & Tacking</li>
                  <li>• Hand Overcast</li>
                  <li>• Buttonhole Stitch</li>
                  <li>• Hemming Stitches</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Seams & Finishes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Plain & French Seam</li>
                  <li>• Turned & Stitched</li>
                  <li>• Lapped & Double Top</li>
                  <li>• Pinked & Overlocked</li>
                  <li>• Stitch Classification</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Components & Finishing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• All Sleeve Types</li>
                  <li>• Collar Attachment</li>
                  <li>• Yokes & Fullness</li>
                  <li>• Pocket Types</li>
                  <li>• Zipper Installation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 7: Textile Science */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Layers className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 7</span>
            </div>
            <h2 className="text-3xl font-bold">Textile Science & Fabric Knowledge</h2>
            <p className="text-muted-foreground mt-2">Comprehensive understanding of fibers, yarns, and fabrics</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Fiber Fundamentals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Textile Terminology</li>
                  <li>• Staple vs Filament</li>
                  <li>• Sources & Classification</li>
                  <li>• Physical Properties</li>
                  <li>• Chemical Properties</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Natural Fibers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cotton & Linen</li>
                  <li>• Silk Production</li>
                  <li>• Wool Processing</li>
                  <li>• Properties & End Use</li>
                  <li>• Microscopic Appearance</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Regenerated Fibers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Viscose Rayon</li>
                  <li>• Acetate Rayon</li>
                  <li>• Modal & Bamboo</li>
                  <li>• Lyocell</li>
                  <li>• Production Process</li>
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
                  <li>• Fabric Finishes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 8: Surface Ornamentation */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Brush className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 8</span>
            </div>
            <h2 className="text-3xl font-bold">Surface Ornamentation</h2>
            <p className="text-muted-foreground mt-2">Master 50+ embroidery techniques and traditional Indian crafts</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Hand Embroidery - 54 Stitches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-3">Master comprehensive embroidery techniques:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-medium text-foreground mb-1">Basic Stitches</p>
                      <ul className="space-y-1">
                        <li>• Running & Back Stitch</li>
                        <li>• Chain & Cable Chain</li>
                        <li>• Blanket & Buttonhole</li>
                        <li>• Stem & Satin Stitch</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Advanced Stitches</p>
                      <ul className="space-y-1">
                        <li>• French & Bullion Knot</li>
                        <li>• Herringbone & Chevron</li>
                        <li>• Woven Wheel & Picot</li>
                        <li>• Long & Short Stitch</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-medium text-foreground mb-1">Decorative</p>
                      <ul className="space-y-1">
                        <li>• Lazy Daisy & Fly</li>
                        <li>• Cross & Seed Stitch</li>
                        <li>• Mirror Work</li>
                        <li>• Split & Turkey Stitch</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Specialty</p>
                      <ul className="space-y-1">
                        <li>• Feather & Arcade</li>
                        <li>• Rose & Scallop</li>
                        <li>• Ceylon & Brick</li>
                        <li>• Colonial Knot</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Traditional Indian Embroidery</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-3">
                  <li>
                    <span className="font-medium text-foreground">Kasuthi</span>
                    <p className="text-xs mt-1">Karnataka's traditional geometric embroidery</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Mirror Work (Shisha)</span>
                    <p className="text-xs mt-1">Reflective embellishment from Gujarat & Rajasthan</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Chikankari</span>
                    <p className="text-xs mt-1">Lucknow's delicate white thread work on muslin</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Phulkari</span>
                    <p className="text-xs mt-1">Punjab's vibrant floral embroidery</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Kantha</span>
                    <p className="text-xs mt-1">Bengal's running stitch quilting tradition</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Kashida</span>
                    <p className="text-xs mt-1">Kashmir's intricate chain stitch artistry</p>
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Patch Work</span>
                    <p className="text-xs mt-1">Creative fabric assemblage techniques</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 9: Draping Technology */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Ruler className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 9</span>
            </div>
            <h2 className="text-3xl font-bold">Draping Technology</h2>
            <p className="text-muted-foreground mt-2">Create garments directly on the dress form</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Draping Fundamentals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Introduction to Draping</li>
                  <li>• Dress Form Preparation</li>
                  <li>• Fabric Grain Lines</li>
                  <li>• Pinning Techniques</li>
                  <li>• Marking Methods</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Basic Draping</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Bodice Draping</li>
                  <li>• Skirt Draping</li>
                  <li>• Sleeve Draping</li>
                  <li>• Neckline Variations</li>
                  <li>• Dart Manipulation</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Advanced Draping</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cowl Draping</li>
                  <li>• Asymmetrical Designs</li>
                  <li>• Evening Wear Draping</li>
                  <li>• Pattern Development</li>
                  <li>• Creative Design</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 10: Fashion Management */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 10</span>
            </div>
            <h2 className="text-3xl font-bold">Fashion Management & Marketing</h2>
            <p className="text-muted-foreground mt-2">Understand the business side of fashion industry</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Fashion Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Fashion Planning</li>
                  <li>• Forecasting Process</li>
                  <li>• Primary & Secondary Research</li>
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
                  <li>• Supply Chain Basics</li>
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
                  <li>• Domestic & International</li>
                  <li>• Distribution Channels</li>
                  <li>• Franchisee Business</li>
                  <li>• Retail Merchandising</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 11: Boutique Management */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Store className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 11</span>
            </div>
            <h2 className="text-3xl font-bold">Boutique Management</h2>
            <p className="text-muted-foreground mt-2">Learn to run your own fashion business</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Operations Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Day-to-Day Operations</li>
                  <li>• Staff Management</li>
                  <li>• Workflow Optimization</li>
                  <li>• Quality Control</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Inventory Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Stock Level Tracking</li>
                  <li>• Supplier Management</li>
                  <li>• Preventing Overstocking</li>
                  <li>• Stockout Prevention</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Visual Merchandising</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Store Layout Design</li>
                  <li>• Window Displays</li>
                  <li>• Lighting Techniques</li>
                  <li>• Product Placement</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Marketing & Branding</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Brand Identity Creation</li>
                  <li>• Logo Design</li>
                  <li>• Customer Relationships</li>
                  <li>• Promotional Strategies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Module 12: Portfolio & Fashion Show */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Module 12</span>
            </div>
            <h2 className="text-3xl font-bold">Fashion Portfolio & Design Collection</h2>
            <p className="text-muted-foreground mt-2">Create your professional portfolio and present in a fashion show</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Portfolio Development</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Story Board:</strong> Develop compelling narrative for your collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Mood Board:</strong> Visual inspiration and aesthetic direction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Color Board:</strong> Cohesive color palette development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Texture Board:</strong> Material and tactile exploration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Swatch Board:</strong> Fabric selection and compilation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Logo Design:</strong> Personal brand identity creation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Technical Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Working Drawings:</strong> Detailed technical illustrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Spec Sheets:</strong> Complete garment specifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Cost Sheets:</strong> Pricing and costing analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Drafting:</strong> Pattern development from measurements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Draping:</strong> 3D fabric manipulation on form</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Flat Pattern:</strong> 2D pattern construction method</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3">🎭 Grand Finale: Fashion Show</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Produce one complete collection from your portfolio and present it as a professional 
                  fashion show. This is your opportunity to showcase your design journey and creative vision!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Study of Designers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Bonus Module</span>
            </div>
            <h2 className="text-3xl font-bold">Study of Fashion Designers</h2>
            <p className="text-muted-foreground mt-2">Learn from the masters of fashion industry</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Indian Designers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Sabyasachi Mukherjee</strong> - Heritage & Bridal</li>
                  <li>• <strong>Ritu Kumar</strong> - Pioneer of Indian Fashion</li>
                  <li>• <strong>JJ Valaya</strong> - Royal Aesthetic</li>
                  <li>• <strong>Wendell Rodricks</strong> - Minimalism & Goa Heritage</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Western Designers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Coco Chanel</strong> - Timeless Elegance</li>
                  <li>• <strong>Calvin Klein</strong> - Minimalist American</li>
                  <li>• <strong>Donatella Versace</strong> - Bold Glamour</li>
                  <li>• <strong>Giorgio Armani</strong> - Italian Sophistication</li>
                  <li>• <strong>Marc Jacobs</strong> - Creative Innovation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Details & Skills */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Skills You'll Master</h2>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Complete Fashion Design Fundamentals",
                  "Professional Fashion Illustration",
                  "Advanced Pattern Drafting (30+ Garments)",
                  "Full Garment Construction",
                  "Textile Science & Fiber Identification",
                  "54 Hand Embroidery Techniques",
                  "Traditional Indian Embroidery",
                  "Draping Technology",
                  "Fashion Forecasting & Merchandising",
                  "Boutique Management & Operations",
                  "Visual Merchandising & Branding",
                  "Portfolio Development & Presentation",
                  "Fashion Show Production",
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
                  <span className="font-semibold">1 Year (12 Months)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-semibold">Advanced Diploma</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Certificate</span>
                  <span className="font-semibold">Advanced Diploma Certificate</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Mode</span>
                  <span className="font-semibold">Online & Offline</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Modules</span>
                  <span className="font-semibold">12 Comprehensive Modules</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Embroidery Stitches</span>
                  <span className="font-semibold">54 Techniques</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Final Project</span>
                  <span className="font-semibold">Fashion Show</span>
                </div>

                 <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Total Fees</span>
                  <span className="font-semibold">₹1,82,000</span>
                </div>
                 <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Fashup Discount (10 Hours Free)</span>
                  <span className="font-semibold text-red-600">- ₹63,700</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground">To Pay</span>
                  <span className="font-semibold text-primary text-lg">₹1,18,300</span>
                </div>
                 <div className="mt-6">
                <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                  <Link to="/Admissions">Enroll Now</Link>
                </Button>
              
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
            <Link to="/verify" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Verify Certificate</span></Link>
            <Link to="/courses/fashup-free-taster-sessions" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">FASHUP Free Course</span></Link>
            <Link to="/courses/fashion-illustration" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fashion Illustration Course</span></Link>
            <Link to="/courses/six-months-diploma-fashion-designing" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">6-Month Diploma</span></Link>
            <Link to="/courses/fabric-knowledge-textile-designing" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fabric &amp; Textile</span></Link>
            <Link to="/courses/fashion-styling" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fashion Styling</span></Link>
            <Link to="/admissions" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Admissions 2026</span></Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Become a Professional Fashion Designer?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our most comprehensive 1-year advanced diploma program and transform your passion 
            into a successful career in fashion design. From fundamentals to fashion show - we've got you covered!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              {/* <Button size="lg" className="w-full sm:w-auto">
                <Users className="w-5 h-5 mr-2" />
                Enroll Now
              </Button> */}
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
    </>
  );
};

export default OneYearAdvancedDiplomaFashionDesigning;
