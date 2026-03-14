import { Card } from '@/components/ui/card';

const terms = [
  {
    title: '1. Intellectual Property',
    content:
      'All materials, designs, patterns, course content, branding assets, and proprietary methodologies created during your engagement with Onati Global Institute of Fashion Technology (OGIFT), Bangalore, remain the exclusive intellectual property of OGIFT. You may not reproduce, distribute, or use any OGIFT IP for personal or commercial purposes outside of your assigned work.',
  },
  {
    title: '2. Confidentiality',
    content:
      'You agree to maintain strict confidentiality regarding all business information, student data, internal processes, and trade secrets of OGIFT. This obligation continues even after the termination of your engagement.',
  },
  {
    title: '3. Non-Compete',
    content:
      'During your engagement and for a period of six (6) months thereafter, you shall not directly or indirectly engage with a competing fashion education institute in a similar capacity without prior written consent from OGIFT.',
  },
  {
    title: '4. Work Standards & Deliverables',
    content:
      'All work must meet the quality standards set by OGIFT. Deliverables must be submitted on time and in the format specified. OGIFT reserves the right to request revisions at no additional cost.',
  },
  {
    title: '5. Communication & Availability',
    content:
      'You are expected to be reachable during agreed working hours via phone, email, or WhatsApp. Regular progress updates must be provided as requested by your supervisor.',
  },
  {
    title: '6. Termination',
    content:
      'OGIFT reserves the right to terminate the engagement at any time with or without cause, providing reasonable notice. Upon termination, all OGIFT materials and IP in your possession must be returned or destroyed immediately.',
  },
  {
    title: '7. Governing Law',
    content:
      'These terms shall be governed by the laws of India, with exclusive jurisdiction in the courts of Bangalore, Karnataka.',
  },
];

const WfhTerms = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Terms & Conditions</h1>
        <p className="text-muted-foreground text-center mb-8">Work From Home Programme — OGIFT Bangalore</p>
        <Card className="p-6 md:p-8 space-y-6">
          {terms.map((t, i) => (
            <div key={i}>
              <h2 className="font-semibold mb-1">{t.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.content}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-4 border-t border-border">
            By agreeing to these terms, you acknowledge that you have read, understood, and accept all conditions outlined above. Last updated: March 2026.
          </p>
        </Card>
      </div>
    </div>
  );
};

export { terms };
export default WfhTerms;
