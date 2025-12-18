import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Globe, Clock, Award, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CoursePromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay for better UX
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenCoursePromo');
      // if (!hasSeenPopup) {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenCoursePromo', 'true');
      //}
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative p-6 sm:p-8">
          {/* Header badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground gap-1">
              <Sparkles className="w-3 h-3" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Globe className="w-3 h-3" />
              Multi-Lingual
            </Badge>
            <Badge variant="outline" className="gap-1 border-primary/30">
              <Clock className="w-3 h-3" />
              3 Months
            </Badge>
             <a href="/newogwebsite.com/ogiftdemo.apk" download style={{fontWeight:"bold"}}>Download Android Demo App</a>
          </div>

          <DialogHeader className="text-left space-y-3">
            <DialogTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Online Fashion Design Certification
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Transform your passion into expertise with our industry-recognized capsule course
            </DialogDescription>
          </DialogHeader>

          {/* Course highlights */}
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50">
              <div className="p-2 rounded-full bg-primary/10">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">AI-Enhanced Learning</h4>
                <p className="text-sm text-muted-foreground">Personalized curriculum powered by artificial intelligence</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50">
              <div className="p-2 rounded-full bg-secondary/30">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Multi-Lingual Support</h4>
                <p className="text-sm text-muted-foreground">Learn in English, Hindi, or Kannada</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50">
              <div className="p-2 rounded-full bg-primary/10">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Industry Certification</h4>
                <p className="text-sm text-muted-foreground">Receive a recognized certificate upon completion</p>
              </div>
              <div>
            
               </div>
             
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 h-12 text-base font-semibold shadow-lg shadow-primary/20">
              <Link to="/courses" onClick={() => setIsOpen(false)}>
                Explore Course
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 h-12 text-base"
              onClick={() => setIsOpen(false)}
            >
              Maybe Later
            </Button>
          </div>

          {/* Limited offer text */}
          <p className="mt-4 text-center text-sm text-muted-foreground">
            🎓 Limited seats available • Enroll now and start your fashion journey
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
