import { Helmet } from 'react-helmet-async';
import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard,
  Play,
  CheckCircle2,
  Clock,
  ArrowLeft,
  RefreshCw,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const { useState, useEffect, useCallback } = React;

interface ProgressRecord {
  video_id: string;
  video_title: string;
  progress_percent: number;
  completed: boolean | number;
  last_watched_at: string;
  session_id?: string;
  watch_duration?: number; // Duration in seconds
  session_start?: string;
}

interface ProgressResponse {
  success: boolean;
  progress: ProgressRecord[];
  total_videos: number;
  completed_videos: number;
  message?: string;
}

const STORAGE_KEY = 'avatar_student_info';
const PHP_ENDPOINT = 'https://www.onatiglobal.com/QueryStudentProgress.php';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [progressData, setProgressData] = useState<ProgressResponse | null>(null);
  const [studentName, setStudentName] = useState("");

  const fetchProgress = useCallback(async () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        toast.error("Please log in to view your dashboard.");
        navigate('/ai-avatar');
        return;
      }

      const studentInfo = JSON.parse(stored);
      const studentId = studentInfo.studentId;
      setStudentName(studentInfo.name || "Student");

      if (!studentId) {
        toast.error("No student ID found. Please log in again.");
        navigate('/ai-avatar');
        return;
      }

      // Call edge function directly via fetch (works from any origin including localhost)
      const EDGE_FUNCTION_URL = 'https://azfyktcspmhcaqbhozuw.supabase.co/functions/v1/student-progress';
      
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id: studentId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      const result = data as ProgressResponse;

      if (result?.success) {
        setProgressData(result);
      } else {
        setProgressData(null);
        toast.error(result?.message || "Failed to load progress data.");
      }
    } catch (error) {
      console.error("[Dashboard] Error fetching progress:", error);
      const message = error instanceof Error ? error.message : "Failed to connect to server. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProgress();
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds || seconds <= 0) return "—";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const remainMins = mins % 60;
      return `${hrs}h ${remainMins}m`;
    }
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };
  
  // Extract clean video title (remove session ID suffix for display)
  const getCleanTitle = (title: string) => {
    // Remove language suffix in parentheses at the end if present, then add it back nicely
    return title;
  };

  const getCompletionRate = () => {
    if (!progressData || progressData.total_videos === 0) return 0;
    return Math.round((progressData.completed_videos / progressData.total_videos) * 100);
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <Helmet>
        <title>Student Progress Dashboard | OGIFT Bangalore | Track Your Fashion Journey</title>
        <meta name="description" content="Track your fashion design learning progress at OGIFT Bangalore — view completed modules, credits & achievements at Bangalore's 4.9★ best fashion institute." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                <LayoutDashboard className="h-7 w-7 text-primary" />
                My Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Welcome back, {studentName}!</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Videos Started</p>
                  <p className="text-2xl font-bold">{progressData?.total_videos || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{progressData?.completed_videos || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-500/10">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold">{getCompletionRate()}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Watch History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!progressData?.progress || progressData.progress.length === 0 ? (
              <div className="text-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No videos watched yet</h3>
                <p className="text-muted-foreground mb-4">Start watching videos to track your progress.</p>
                <Button asChild>
                  <Link to="/videos">Browse Videos</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {progressData.progress.map((record, index) => (
                  <div 
                    key={`${record.video_id}-${record.session_id || index}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{getCleanTitle(record.video_title)}</h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(record.session_start || record.last_watched_at)}
                        </p>
                        {record.watch_duration && record.watch_duration > 0 && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Play className="h-3 w-3" />
                            Duration: {formatDuration(record.watch_duration)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:w-48">
                      <div className="flex-1">
                        <Progress value={record.progress_percent} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1 text-right">
                          {record.progress_percent}%
                        </p>
                      </div>
                      {(record.completed === true || record.completed === 1) && (
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button asChild variant="default">
            <Link to="/videos">
              <Play className="h-4 w-4 mr-2" />
              Continue Learning
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/credit-packages">
              Buy More Credits
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
