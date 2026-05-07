import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Home, Sparkles, Clock, MapPin, MessageCircle, Send, LogIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { terms } from './WfhTerms';

const WHATSAPP_NUMBER = '919886337682';
const WHATSAPP_MESSAGE = 'Hi! I\'m interested in the Work From Home opportunity at Onati Global Institute. Please share more details.';

const WorkFromHome = () => {
  const navigate = useNavigate();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'terms'>('form');
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  // Login state
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginStep, setLoginStep] = useState<'phone' | 'terms'>('phone');
  const [loginApplicantName, setLoginApplicantName] = useState('');

  const handleNext = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setStep('terms');
  };

  const handleSubmit = async (agreed: boolean) => {
    setLoading(true);
    const { error } = await supabase.from('wfh_applications').insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      state: 'N/A',
      city: 'N/A',
      agreed_to_terms: agreed,
    } as any);
    setLoading(false);
    if (error) {
      toast({ title: 'Something went wrong', description: error.message, variant: 'destructive' });
    } else {
      if (agreed) {
        toast({ title: 'Application submitted!', description: 'We will get back to you soon.' });
      } else {
        toast({ title: 'Application submitted', description: 'You did not agree to the terms. We may follow up for clarification.' });
      }
      setForm({ name: '', phone: '', email: '' });
      setStep('form');
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStep('form');
  };

  // Login handlers
  const handleLoginCheck = async () => {
    if (!loginPhone.trim() || loginPhone.trim().length < 5) {
      toast({ title: 'Please enter a valid phone number', variant: 'destructive' });
      return;
    }
    setLoginLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('wfh-login', {
        body: { phone: loginPhone.trim() },
      });
      if (error) throw error;

      if (data.status === 'not_found') {
        toast({ title: 'Not found', description: data.message, variant: 'destructive' });
      } else if (data.status === 'not_agreed') {
        setLoginApplicantName(data.applicant?.name || '');
        toast({ title: 'Terms not agreed', description: data.message, variant: 'destructive' });
        setLoginStep('terms');
      } else if (data.status === 'success') {
        setLoginOpen(false);
        setLoginStep('phone');
        setLoginPhone('');
        navigate('/careers/work-from-home/dashboard', { state: { applicant: data.applicant } });
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLoginAgree = async () => {
    setLoginLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('wfh-login', {
        body: { phone: loginPhone.trim(), agree: true },
      });
      if (error) throw error;

      if (data.status === 'success') {
        toast({ title: 'Terms accepted!', description: 'Welcome aboard.' });
        setLoginOpen(false);
        setLoginStep('phone');
        setLoginPhone('');
        navigate('/careers/work-from-home/dashboard', { state: { applicant: data.applicant } });
      } else {
        toast({ title: 'Error', description: data.message || 'Something went wrong', variant: 'destructive' });
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setLoginStep('phone');
    setLoginPhone('');
  };

  const benefits = [
    { icon: Home, title: 'Work From Anywhere', description: 'Enjoy the flexibility of working from the comfort of your home' },
    { icon: Clock, title: 'Flexible Hours', description: 'Choose hours that work best for your schedule' },
    { icon: Sparkles, title: 'Creative Freedom', description: 'Express your creativity in a supportive environment' },
    { icon: MapPin, title: 'Pan-India Opportunities', description: 'Open to talented individuals across all states in India' },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Work From Home Fashion Jobs Bangalore | OGIFT Careers 2026</title>
        <meta name="description" content="Explore work-from-home fashion career opportunities with OGIFT Bangalore. Earn from home using your fashion design skills — pattern making, styling & boutique management. 4.9★ rated best fashion institute." />
        <meta name="keywords" content="work from home fashion jobs bangalore, fashion career work from home, fashion design freelance bangalore, OGIFT work from home, Onati Global careers, fashion jobs from home india 2026, fashion styling work from home, pattern making work from home" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/careers/work-from-home" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Work From Home Fashion Careers | OGIFT Bangalore 2026" />
        <meta property="og:description" content="Earn from home with your fashion skills at OGIFT Bangalore. Pattern making, styling & boutique management work-from-home opportunities." />
        <meta property="og:url" content="https://www.ogiftbangalore.com/careers/work-from-home" />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10 pt-12">
          <img src="/WFH.png"/>
          <div className="max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            
              <Home className="h-4 w-4" />
              Now Hiring — Work From Home
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Join Our Remote Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Be part of Onati Global's growing remote workforce. We're looking for passionate individuals across India to join our team from the comfort of their homes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setOpen(true)} className="gap-2 text-lg px-8 py-6">
                <Send className="h-5 w-5" />
                Apply Now
              </Button>
              <Button size="lg" variant="secondary" onClick={() => setLoginOpen(true)} className="gap-2 text-lg px-8 py-6">
                <LogIn className="h-5 w-5" />
                Login
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 text-lg px-8 py-6">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" fill="currentColor" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Why Work With Us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
                <b.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Related at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link to="/placements" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Placement Support</span></Link>
            <Link to="/portfolio" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">AI Portfolio Builder</span></Link>
            <Link to="/courses/digital-portfolio-making" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Digital Portfolio Course</span></Link>
            <Link to="/courses/design-pattern-making-portfolio-3months" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Portfolio Diploma (3 Months)</span></Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Work From Home Fashion Design Opportunities — OGIFT</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>OGIFT's Work From Home programme offers qualified fashion design graduates and skilled fashion professionals the opportunity to earn an income from home by taking on fashion design and garment-related work assignments through OGIFT's employer network. The programme is designed for graduates who have the skills to deliver professional-quality fashion work but prefer the flexibility of home-based freelance work — whether due to family commitments, location constraints, or a preference for independent working. OGIFT connects registered work-from-home professionals with verified employers who need skilled fashion talent on a project or contract basis.</p>
              <p>Work-from-home assignments available through the OGIFT network include fashion illustration, digital pattern making, trend research and reporting, graphic design for fashion brands, social media content creation for boutiques and fashion labels, online fashion tutoring, garment specification writing, and quality review of design documents. The type and volume of work available to each registered professional depends on their skill set, qualifications, and the current needs of OGIFT's employer network. OGIFT does not guarantee a specific volume of work but actively matches registered professionals with suitable assignments as they arise.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Can Register?</h3>
              <p>The Work From Home programme is open to OGIFT graduates and to qualified fashion professionals who can demonstrate relevant skills through a portfolio review. Registered professionals must be willing to complete assignments to the quality and timeline specified by the employer, and to maintain professional communication with both OGIFT and the client. Professionals who consistently deliver high-quality work are given priority for new assignments and are eligible for higher-value projects over time. Registration is free for OGIFT graduates.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">How to Get Started</h3>
              <p>To register for the Work From Home programme, complete the registration form on this page and upload your portfolio and OGIFT qualification details. The OGIFT careers team will review your application and contact you when assignments matching your skills become available. For questions about the programme, eligibility requirements, or the types of assignments available, contact the OGIFT careers team at +91 90369 28799 or email admissions@ogiftbangalore.com. To qualify for the programme, OGIFT recommends completing at least one OGIFT diploma or advanced course first — visit ogiftbangalore.com/courses to explore the options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-lg mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Interested?</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Reach out to us on WhatsApp and we'll share all the details about the opportunity.
            </p>
            <Button size="lg" asChild className="gap-2">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" fill="currentColor" />
                Message Us on WhatsApp
              </a>
            </Button>
          </Card>
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh]">
          {step === 'form' ? (
            <>
              <DialogHeader>
                <DialogTitle>Apply for Work From Home</DialogTitle>
                <DialogDescription>Fill in your details to proceed.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                  <Input id="name" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                  <Input id="phone" type="tel" placeholder="Your phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <Input id="email" type="email" placeholder="Your email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                <Button onClick={handleNext}>Next</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Terms & Conditions</DialogTitle>
                <DialogDescription>Please read the terms carefully before proceeding.</DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[50vh] pr-4">
                <div className="space-y-4">
                  {terms.map((t, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-sm mb-1">{t.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.content}</p>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground pt-3 border-t border-border">
                    By clicking "I Agree", you confirm that you have read, understood, and accept all conditions above.
                  </p>
                </div>
              </ScrollArea>
              <DialogFooter className="gap-2 flex-col sm:flex-row">
                <Button variant="outline" onClick={() => setStep('form')}>Back</Button>
                {/* <Button variant="destructive" onClick={() => handleSubmit(false)} disabled={loading}>
                  I Disagree
                </Button> */}
                <Button onClick={() => handleSubmit(true)} disabled={loading}>
                  {loading ? 'Submitting...' : 'I Agree & Submit'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={handleLoginClose}>
        <DialogContent className="sm:max-w-lg max-h-[90vh]">
          {loginStep === 'phone' ? (
            <>
              <DialogHeader>
                <DialogTitle>Login to Your Dashboard</DialogTitle>
                <DialogDescription>Enter the phone number you used during application.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="login-phone">Phone Number</Label>
                  <Input
                    id="login-phone"
                    type="tel"
                    placeholder="Your registered phone number"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLoginCheck()}
                  />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={handleLoginClose}>Cancel</Button>
                <Button onClick={handleLoginCheck} disabled={loginLoading}>
                  {loginLoading ? 'Checking...' : 'Login'}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Terms & Conditions Required</DialogTitle>
                <DialogDescription>
                  Hi {loginApplicantName}, you haven't agreed to the Terms & Conditions yet. Please review and agree to continue.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[50vh] pr-4">
                <div className="space-y-4">
                  {terms.map((t, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-sm mb-1">{t.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.content}</p>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground pt-3 border-t border-border">
                    By clicking "I Agree", you confirm that you have read, understood, and accept all conditions above.
                  </p>
                </div>
              </ScrollArea>
              <DialogFooter className="gap-2 flex-col sm:flex-row">
                <Button variant="outline" onClick={() => setLoginStep('phone')}>Back</Button>
                <Button onClick={handleLoginAgree} disabled={loginLoading}>
                  {loginLoading ? 'Submitting...' : 'I Agree & Continue'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkFromHome;
