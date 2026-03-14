import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Globe, Clock, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Fallback constants (used if backend token generation fails)
const VIDEO_PROXY_BASE = 'https://www.newogwebsite.com/OGIFTVideos/English/proxy.php';
const VIDEO_FILENAME = 'OGIFT-Teaser.mp4';

export const CoursePromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  // Fetch fresh video URL with token when popup opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchVideoUrl = async () => {
      setIsLoadingUrl(true);
      setVideoError(false);

      try {
        const { data, error } = await supabase.functions.invoke('video-token');

        if (error) {
          console.error('Error fetching video token:', error);
          // Use fallback without token
          setVideoUrl(`${VIDEO_PROXY_BASE}?file=${encodeURIComponent(VIDEO_FILENAME)}`);
        } else if (data?.url) {
          console.log('Got fresh video URL');
          setVideoUrl(data.url);
        } else {
          setVideoUrl(`${VIDEO_PROXY_BASE}?file=${encodeURIComponent(VIDEO_FILENAME)}`);
        }
      } catch (err) {
        console.error('Failed to fetch video token:', err);
        setVideoUrl(`${VIDEO_PROXY_BASE}?file=${encodeURIComponent(VIDEO_FILENAME)}`);
      } finally {
        setIsLoadingUrl(false);
      }
    };

    fetchVideoUrl();
  }, [isOpen]);

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

  // Start playing when dialog opens and video URL is ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen || !videoUrl || isLoadingUrl) return;

    setVideoError(false);

    // Ensure attributes are applied before attempting playback (esp. iOS/Safari)
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.currentTime = 0;

    // Force the browser to (re)load the media when the dialog opens
    video.load();

    // Try to play when dialog opens
    const playVideo = () => {
      const p = video.play();
      if (p && typeof (p as Promise<void>).catch === 'function') {
        (p as Promise<void>).catch((err) => {
          console.log('CoursePromoPopup video autoplay failed:', err);
        });
      }
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= 20) {
        video.currentTime = 0;
        playVideo();
      }
    };

    const handleCanPlay = () => playVideo();

    const handleLoadedMetadata = () => {
      if (video.currentTime !== 0) video.currentTime = 0;
      playVideo();
    };

    const handleError = () => {
      console.log('CoursePromoPopup video error:', {
        src: video.currentSrc,
        networkState: video.networkState,
        readyState: video.readyState,
        errorCode: video.error?.code,
        errorMessage: (video.error as any)?.message,
      });
      setVideoError(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);

    playVideo();
    const t = window.setTimeout(() => playVideo(), 150);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      window.clearTimeout(t);
    };
  }, [isOpen, videoUrl, isLoadingUrl]);

  const handleVideoClick = () => {
    setIsOpen(false);
    navigate('/quicktour');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative p-6 sm:p-8">
          {/* Video Section - Centered */}
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-md rounded-lg overflow-hidden aspect-video bg-black shadow-lg">
              {isLoadingUrl ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : videoError ? (
                <div className="w-full h-full flex items-center justify-center p-4 text-center">
                  <p className="text-sm text-primary-foreground/90">
                    Video preview unavailable right now.
                  </p>
                </div>
              ) : videoUrl ? (
                <button
                  onClick={handleVideoClick}
                  className="relative w-full h-full group cursor-pointer"
                  aria-label="Watch Quick Tour"
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>

                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
                    </div>
                  </div>
                </button>
              ) : null}
            </div>
          </div>

          {/* Header badges */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
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
          
          </div>

          <DialogHeader className="text-center space-y-3">
            <DialogTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Online Fashion Design Certification
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              Transform your passion into expertise with our industry-recognized capsule course
            </DialogDescription>
          </DialogHeader>


          {/* CTA buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 h-12 text-base font-semibold shadow-lg shadow-primary/20">
              <Link to="/quicktour" onClick={() => setIsOpen(false)}>
                Watch Quick Tour
              </Link>
            </Button>

             <Button asChild className="flex-1 h-12 text-base font-semibold shadow-lg shadow-primary/20">
              <Link to="/counsellor" onClick={() => setIsOpen(false)}>
                Meet Counsellor
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
