import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { GraduationCap, Loader2, Sparkles, User } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

const { useState, useEffect } = React;

// Hardcoded Supabase credentials for AI Avatar feature
// This ensures the feature works regardless of local .env configuration
const SUPABASE_URL = 'https://azfyktcspmhcaqbhozuw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZnlrdGNzcG1oY2FxYmhvenV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTg4NDIsImV4cCI6MjA4MTczNDg0Mn0.qvGq90_IQxWjNjKTdqRzFO63DIuSUMCPCiFcA7qG7fM';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface StudentInfo {
  studentId: string;
  name: string;
  email: string;
  phone: string;
}

interface PrivacyState {
  needsAcceptance: boolean;
  courseType: string;
  checked: boolean;
}

const STORAGE_KEY = 'avatar_student_info';

export default function AIAvatarLogin(): React.JSX.Element {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeState, setWelcomeState] = useState<{ show: boolean; name: string }>({ show: false, name: '' });
  const [privacyState, setPrivacyState] = useState<PrivacyState>({
    needsAcceptance: false,
    courseType: '',
    checked: false
  });
  const [pendingStudentData, setPendingStudentData] = useState<StudentInfo | null>(null);

  // Check if already logged in
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const student = JSON.parse(stored);
        if (student && student.studentId) {
          // Already logged in, redirect to avatar
          // navigate('/ai-avatar-chat');
          navigate('/videos');
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Auto-transition after showing welcome message
  useEffect(() => {
    if (welcomeState.show) {
      const timer = setTimeout(() => {
        // navigate('/ai-avatar-chat');
        navigate('/videos');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [welcomeState.show]);

  const handlePrivacyAccept = async () => {
    if (!pendingStudentData) return;
    
    setIsLoading(true);
    
    try {
      // Update privacy acceptance on server
      await supabaseClient.functions.invoke('verify-student', {
        body: { studentId: pendingStudentData.studentId, action: 'update_privacy' }
      });
      
      // Store in localStorage and proceed
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingStudentData));
      setWelcomeState({ show: true, name: pendingStudentData.name });
    } catch (err) {
      console.error('Privacy update error:', err);
      toast.error('Failed to update. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    const trimmedId = studentId.trim();
    if (!trimmedId) {
      toast.error('Please enter your Student ID');
      return;
    }

    setIsLoading(true);
    setPrivacyState({ needsAcceptance: false, courseType: '', checked: false });
    setPendingStudentData(null);

    try {
      const { data, error } = await supabaseClient.functions.invoke('verify-student', {
        body: { studentId: trimmedId }
      });

      if (error) {
        console.error('Verification error:', error);
        toast.error('Failed to verify student ID. Please try again.');
        setIsLoading(false);
        return;
      }

      if (!data?.success) {
        toast.error(data?.message || 'Invalid Student ID. Please check and try again.');
        setIsLoading(false);
        return;
      }

      const studentInfo: StudentInfo = {
        studentId: trimmedId,
        name: data.name || 'Student',
        email: data.email || '',
        phone: data.phone || ''
      };

      // Check if privacy acceptance is needed (if privacy_accepted is empty)
      if (data.needsPrivacyAcceptance) {
        setPendingStudentData(studentInfo);
        setPrivacyState({
          needsAcceptance: true,
          courseType: '',
          checked: false
        });
        setIsLoading(false);
        return;
      }

      // Store in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studentInfo));
      
      // Show welcome message before transitioning
      setWelcomeState({ show: true, name: studentInfo.name });
    } catch (err) {
      console.error('Login error:', err);
      toast.error('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  // Welcome screen after successful login
  if (welcomeState.show) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/10 flex items-center justify-center p-4">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <Card className="w-full max-w-md relative backdrop-blur-sm bg-card/95 shadow-2xl border-primary/10">
          <CardContent className="py-16 text-center">
            {/* Success animation */}
            <div className="mx-auto relative mb-8">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mx-auto">
                <Sparkles className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>

            <h1 className="text-4xl font-serif font-bold text-primary mb-4">
              Hello, {welcomeState.name}!
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Welcome to Your Online Training
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading your experience...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/10 flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative backdrop-blur-sm bg-card/95 shadow-2xl border-primary/10">
        <CardHeader className="text-center space-y-4 pb-2">
          {/* Avatar icon with glow effect */}
          <div className="mx-auto relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-accent animate-pulse" />
          </div>

          <div>
            <CardTitle className="text-3xl font-serif font-bold text-primary">
              Login to OGIFT Connect
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Enter your Student ID to begin your personalized experience
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="pl-11 h-12 text-lg border-2 focus:border-primary transition-colors"
                  disabled={isLoading || privacyState.needsAcceptance}
                  autoFocus
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Your Student ID will be verified securely
              </p>
            </div>

            {/* Terms and Conditions Checkbox - Only shown when needed */}
            {privacyState.needsAcceptance && (
              <div className="flex items-start space-x-3 p-4 bg-secondary/30 rounded-lg border border-primary/20">
                <Checkbox
                  id="terms"
                  checked={privacyState.checked}
                  onCheckedChange={(checked) => {
                    setPrivacyState(prev => ({ ...prev, checked: checked === true }));
                  }}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  Read and Accept Our{' '}
                  <Link 
                    to="/termsandconditions" 
                    target="_blank"
                    className="text-primary hover:underline font-medium"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            )}

            {privacyState.needsAcceptance ? (
              <Button
                type="button"
                onClick={handlePrivacyAccept}
                className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading || !privacyState.checked}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Accept & Continue
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-12 text-lg font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start Conversation
                  </>
                )}
              </Button>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground">
              Don't have a Student ID?{' '}
              <a 
                href="/admissions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Enroll
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
