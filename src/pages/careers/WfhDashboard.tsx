import { useLocation, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Mail, Calendar, CheckCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Applicant {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  agreed_to_terms: boolean;
  created_at: string;
}

const WfhDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const applicant = location.state?.applicant as Applicant | undefined;

  if (!applicant) {
    return <Navigate to="/careers/work-from-home" replace />;
  }

  const appliedDate = new Date(applicant.created_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome, {applicant.name}!</h1>
          <p className="text-muted-foreground">Your Work From Home Application Dashboard</p>
        </div>

        <Card className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Application Details</h2>
            <Badge variant="default" className="gap-1">
              <CheckCircle className="h-3 w-3" />
              Terms Agreed
            </Badge>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium">{applicant.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone Number</p>
                <p className="font-medium">{applicant.phone}</p>
              </div>
            </div>

            {applicant.email && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <p className="font-medium">{applicant.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Applied On</p>
                <p className="font-medium">{appliedDate}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Your application is being reviewed. We will contact you shortly with further details about the Work From Home opportunity.
            </p>
            <Button variant="outline" onClick={() => navigate('/careers/work-from-home')} className="gap-2">
              <LogOut className="h-4 w-4" />
              Back to WFH Page
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WfhDashboard;
