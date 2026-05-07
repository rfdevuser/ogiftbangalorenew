import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Sparkles, Palette, ArrowRight } from 'lucide-react';
import UploadSection from '@/components/portfolio/UploadSection';
import CritiqueCard from '@/components/portfolio/CritiqueCard';
import { Helmet } from 'react-helmet-async';

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  ai_critique: any;
  critique_summary: string | null;
  scores: any;
  is_public: boolean;
  created_at: string;
  contributor_name?: string | null;
  contributor_city?: string | null;
}

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('portfolio-session-id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('portfolio-session-id', sessionId);
  }
  return sessionId;
};

const PortfolioBuilder = () => {
  const [sessionItems, setSessionItems] = useState<PortfolioItem[]>([]);
  const [publicItems, setPublicItems] = useState<PortfolioItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');

  const sessionId = getSessionId();

  const fetchPublicItems = async () => {
    const { data, error } = await supabase
      .from('portfolio_items' as any)
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setPublicItems(data as unknown as PortfolioItem[]);
    }
    setLoadingItems(false);
  };

  useEffect(() => {
    fetchPublicItems();
  }, []);

  const handleCritiqueComplete = (newItem?: PortfolioItem) => {
    if (newItem) {
      setSessionItems(prev => [newItem, ...prev]);
    }
    setActiveTab('portfolio');
  };

  return (
    <>
      <Helmet>
        <title>AI Fashion Portfolio Builder Bangalore 2026 | OGIFT | Free for Students</title>
        <meta name="description" content="Build a winning fashion portfolio with AI critique at OGIFT — Bangalore's best fashion institute (4.9★). Upload sketches, get expert feedback on proportion, color theory & commercial viability. Free for enrolled students." />
        <meta name="keywords" content="best fashion portfolio builder bangalore, AI fashion portfolio critique, fashion design portfolio bangalore 2026, fashion design feedback tool, fashion student portfolio india, fashion illustration critique bangalore, design portfolio review tool, OGIFT portfolio builder, Onati Global fashion tools" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/portfolio" />
        <meta property="og:title" content="AI Fashion Portfolio Builder | Onati Global Institute Bangalore" />
        <meta property="og:description" content="Upload your fashion designs and get instant AI-powered professional critique. Build a portfolio that impresses recruiters — free for OGIFT students in Bangalore." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/portfolio" />
        <meta property="og:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Fashion Portfolio Builder | OGIFT Bangalore" />
        <meta name="twitter:description" content="Get instant AI critique on your fashion designs — proportion, color theory, trend alignment & more. Bangalore's best fashion design tool." />
        <meta name="twitter:image" content="https://ogiftbangalore.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Fashion Portfolio Builder",
          "description": "Upload fashion designs and receive instant AI-powered professional critique on proportion, color theory, trend alignment, and commercial viability.",
          "url": "https://ogiftbangalore.com/portfolio",
          "applicationCategory": "DesignApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR",
            "description": "Free for enrolled students"
          },
          "provider": {
            "@type": "EducationalOrganization",
            "name": "Onati Global Institute of Fashion Technology",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bengaluru",
              "addressRegion": "Karnataka",
              "addressCountry": "IN"
            }
          }
        })}</script>
      </Helmet>

      <main className="min-h-screen pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pb-12">
          <div className="container mx-auto px-4 pt-8">
            <div className="max-w-3xl mx-auto text-center">
              <img src="/portfolio.png"/>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                AI-Powered Design Feedback
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Portfolio Builder
                <span className="block text-primary">& AI Critique</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your sketches, mood boards, or finished pieces and receive instant expert-level feedback
                on proportion, color theory, trend alignment, and commercial viability.
               
              </p>
              <p> ** Your designs are stored securely and not shared.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 -mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="portfolio">My Critiques</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload">
              <div className="max-w-2xl mx-auto">
                <UploadSection userId={sessionId} onCritiqueComplete={handleCritiqueComplete} />
              </div>
            </TabsContent>

            {/* My Critiques Tab (session-based) */}
            <TabsContent value="portfolio">
              <div className="max-w-4xl mx-auto space-y-6">
                {sessionItems.length === 0 ? (
                  <div className="text-center py-16 bg-muted/30 rounded-2xl">
                    <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No critiques yet</h3>
                    <p className="text-muted-foreground mb-4">Upload your first design to get AI feedback!</p>
                    <Button onClick={() => setActiveTab('upload')}>
                      Upload Design <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  sessionItems.map((item) => (
                    <CritiqueCard key={item.id} item={item} onUpdate={() => {}} showActions={false} />
                  ))
                )}
              </div>
            </TabsContent>

            {/* Public Gallery Tab */}
            <TabsContent value="gallery">
              <div className="max-w-4xl mx-auto space-y-6">
                {loadingItems ? (
                  <div className="text-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                  </div>
                ) : publicItems.length === 0 ? (
                  <div className="text-center py-16 bg-muted/30 rounded-2xl">
                    <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No public portfolios yet</h3>
                    <p className="text-muted-foreground">Be the first to share your work!</p>
                  </div>
                ) : (
                  publicItems.map((item) => (
                    <CritiqueCard key={item.id} item={item} onUpdate={fetchPublicItems} showActions={false} />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">AI Fashion Portfolio Builder — OGIFT Bangalore</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>OGIFT's AI Fashion Portfolio Builder is a free digital tool that helps fashion design students and graduates create a professional portfolio to showcase their work to employers, clients, and design schools. A strong portfolio is essential for any fashion career — it is the primary way that designers, illustrators, stylists, and pattern makers demonstrate their skills and creative sensibility to potential employers. The OGIFT Portfolio Builder uses AI to guide you through the process of selecting, organising, and presenting your best work in a format that meets current industry expectations.</p>
              <p>The Portfolio Builder is available free to all OGIFT students and graduates as part of the institute's 100% placement support programme. It is also accessible to any aspiring fashion professional who wants to build or improve their portfolio. The tool supports multiple types of portfolio content — fashion illustrations, technical flat drawings, garment photographs, mood boards, fabric swatches, and written design rationales. Each section includes guidance on what employers in specific roles (designer, pattern maker, stylist, etc.) are looking for, so you can tailor your portfolio to the opportunities you are targeting.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Can Use the Portfolio Builder?</h3>
              <p>The OGIFT Portfolio Builder is designed for students currently enrolled in OGIFT programmes, graduates preparing for job applications, and self-taught fashion creatives who want to formalise and present their work professionally. It is particularly valuable for students completing the Design Process &amp; Pattern Making 3-Month course, the Digital Portfolio Making course, and the DPPMP 3-Month course — all of which include portfolio development as a core component. The Portfolio Builder integrates directly with these courses, so your coursework can flow directly into your professional portfolio.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Portfolio Courses at OGIFT</h3>
              <p>If you want structured, faculty-guided support for building your portfolio, OGIFT offers dedicated portfolio courses — the Digital Portfolio Making course (1 month) and the Design Pattern Making Portfolio 3-Month course. These programmes combine technical skill development with professional presentation training, and every student graduates with a completed, employer-ready portfolio. To learn more about portfolio courses or to start using the AI Portfolio Builder, visit the OGIFT campus in Vinayakanagar or call +91 90369 28799.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Related at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <Link to="/courses/design-pattern-making-portfolio-3months" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">DPPMP 3-Month Course</span></Link>
            <Link to="/courses/digital-portfolio-making" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Digital Portfolio Making</span></Link>
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default PortfolioBuilder;
