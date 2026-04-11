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
        <link rel="canonical" href="https://ogiftbangalore.com/portfolio" />
        <meta property="og:title" content="AI Fashion Portfolio Builder | Onati Global Institute Bangalore" />
        <meta property="og:description" content="Upload your fashion designs and get instant AI-powered professional critique. Build a portfolio that impresses recruiters — free for OGIFT students in Bangalore." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ogiftbangalore.com/portfolio" />
        <meta property="og:image" content="https://ogiftbangalore.com/og-image.jpg" />
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
      </main>
    </>
  );
};

export default PortfolioBuilder;
