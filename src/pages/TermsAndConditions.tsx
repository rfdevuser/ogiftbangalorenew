import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Users, BookOpen, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TermsAndConditions(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/10 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/ai-avatar" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>

        <Card className="backdrop-blur-sm bg-card/95 shadow-2xl border-primary/10">
          <CardHeader className="text-center border-b border-border/50 pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg mb-4">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-serif font-bold text-primary">
              Terms and Conditions
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Last updated: January 2026
            </p>
          </CardHeader>

          <CardContent className="pt-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Onati Global's AI Avatar Assistant and Online Learning Platform. These Terms and Conditions 
                govern your use of our services, including the AI Avatar Assistant, video courses, and related educational 
                materials. By accessing or using our services, you agree to be bound by these terms.
              </p>
            </section>

            {/* Privacy and Data */}
            <section>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                2. Privacy and Data Collection
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  We collect and process personal information necessary to provide our educational services. This includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Student identification information (Student ID, name, email, phone)</li>
                  <li>Course enrollment and progress data</li>
                  <li>Interaction data with the AI Avatar Assistant</li>
                  <li>Payment and transaction records</li>
                </ul>
                <p>
                  Your data is stored securely and is used solely for providing and improving our educational services. 
                  We do not sell or share your personal information with third parties for marketing purposes.
                </p>
              </div>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                3. User Responsibilities
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>As a user of our platform, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the confidentiality of your Student ID and account credentials</li>
                  <li>Use the services only for lawful educational purposes</li>
                  <li>Not share, distribute, or reproduce course materials without authorization</li>
                  <li>Not attempt to circumvent any security measures or access restrictions</li>
                </ul>
              </div>
            </section>

            {/* AI Avatar Usage */}
            <section>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-primary" />
                4. AI Avatar Assistant Usage
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  The AI Avatar Assistant is designed to help you with your learning experience. Please note:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The AI provides educational assistance and should not be considered as professional advice</li>
                  <li>Conversations may be logged for quality improvement and training purposes</li>
                  <li>The AI may occasionally provide incorrect or outdated information</li>
                  <li>We reserve the right to modify or discontinue the AI service at any time</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                5. Intellectual Property
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, including but not limited to videos, text, graphics, logos, and software, is the property 
                of Onati Global and is protected by copyright and other intellectual property laws. You are granted a 
                limited, non-exclusive, non-transferable license to access and use the materials for personal educational 
                purposes only.
              </p>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                6. Payment and Refund Policy
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Access to our services requires payment as specified during enrollment. Refunds are subject to our 
                  refund policy, which may vary based on the course and timing of the request. Please contact our 
                  support team for specific refund inquiries.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-primary" />
                7. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Onati Global shall not be liable for any indirect, incidental, special, or consequential damages 
                arising from your use of our services. Our total liability shall not exceed the amount paid by you 
                for the services in the twelve months preceding the claim.
              </p>
            </section>

            {/* Contact */}
            <section className="border-t border-border/50 pt-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-3 p-4 bg-secondary/30 rounded-lg">
                <p className="text-foreground font-medium">OGIFT Bangalore</p>
                <p className="text-muted-foreground">Email: admin@ogiftbangalore.com</p>
                <p className="text-muted-foreground">Website: www.ogiftbangalore.com</p>
              </div>
            </section>

            {/* Acceptance */}
            <section className="bg-primary/5 p-6 rounded-lg border border-primary/20">
              <p className="text-foreground text-center">
                By checking the "Read and Accept Our Terms and Conditions" checkbox during login, 
                you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </section>

            <div className="flex justify-center pt-4">
              <Button asChild>
                <Link to="/ai-avatar">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
