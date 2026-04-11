import { Shield, Scale, FileCheck, Fingerprint, Globe, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

const rights = [
  {
    icon: Scale,
    title: 'Copyright Act, 1957',
    summary: 'Your original designs are automatically protected under Indian copyright law from the moment of creation.',
    details:
      'Under the Indian Copyright Act, 1957, original artistic works — including fashion sketches, illustrations, textile patterns, and digital designs — are automatically protected. You do not need to register to own copyright, though registration strengthens enforcement. Protection lasts for the lifetime of the creator plus 60 years.',
  },
  {
    icon: FileCheck,
    title: 'Designs Act, 2000',
    summary: 'Register unique visual features of your garments for up to 15 years of exclusive rights.',
    details:
      'The Designs Act, 2000 allows you to register novel shapes, patterns, ornamentations, and configurations applied to articles. A registered design gives you the exclusive right to apply it to any article in the class for an initial period of 10 years, extendable by 5 more years. Registration is done through the Controller General of Patents, Designs and Trade Marks.',
  },
  {
    icon: Fingerprint,
    title: 'Trade Marks Act, 1999',
    summary: 'Protect your brand name, logo, and label from imitation by competitors.',
    details:
      'Your brand identity — including names, logos, taglines, and even distinctive colour combinations — can be registered as trademarks. This prevents others from using deceptively similar marks. A registered trademark is valid for 10 years and is renewable indefinitely.',
  },
  {
    icon: Globe,
    title: 'IT Act & Social Media Takedowns',
    summary: 'Indian law mandates platforms to remove infringing content within 36 hours of a valid complaint.',
    details:
      'Under the Information Technology (Intermediary Guidelines) Rules, 2021, social media platforms must acknowledge complaints within 24 hours and resolve them within 15 days. For copyright and design infringement, you can file a takedown notice directly with platforms like Instagram, Pinterest, and Facebook. Persistent infringers can face criminal penalties under Section 63 of the Copyright Act.',
  },
];

const platformBenefits = [
  {
    icon: Shield,
    label: 'Blockchain Timestamping',
    text: 'Every post and digital asset you create is recorded on our educational blockchain with an immutable timestamp — providing verifiable proof of when you created your work.',
  },
  {
    icon: FileCheck,
    label: 'Ownership Ledger',
    text: 'Your portfolio pieces are linked to your verified account with a unique token ID and block hash, creating a tamper-proof chain of ownership.',
  },
  {
    icon: BookOpen,
    label: 'Evidence for Disputes',
    text: 'If your design is copied, the blockchain record serves as strong supporting evidence of prior creation — useful in legal proceedings and platform takedown requests.',
  },
];

const KnowYourRights = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">Know Your Rights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            As a fashion designer in India, your creative work is protected by multiple laws. Understanding these rights helps you defend against social media theft and unauthorised copying.
          </p>
        </CardContent>
      </Card>

      {/* Indian IP Laws */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Legal Protections in India
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {rights.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <span className="font-medium">{item.title}</span>
                      <p className="text-xs text-muted-foreground font-normal mt-0.5">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-7">
                  {item.details}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Platform Benefits */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-primary" />
            How OGIFT Protects You
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {platformBenefits.map((benefit, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="mt-0.5 shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <benefit.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-1 text-xs">
                  {benefit.label}
                </Badge>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="border-accent/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Tips to Protect Your Work</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
            <li>Always watermark your images before sharing on external social media.</li>
            <li>Post your designs on OGIFT first to establish a blockchain-timestamped record.</li>
            <li>Screenshot and save takedown confirmations from platforms.</li>
            <li>Consider registering high-value designs under the Designs Act, 2000.</li>
            <li>Use low-resolution previews on public platforms; share full quality only with verified buyers.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowYourRights;
